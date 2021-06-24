import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react';
import { io } from 'socket.io-client';
import Peer, { Instance, SignalData } from 'simple-peer';

interface ISocketContext {
  stream: MediaStream | undefined;
  me: string;
  call: ICall;
  callAccepted: boolean;
  callEnded: boolean;
  name: string;
  myVideo: any;
  userVideo: any;
  setName(name: string): void;
  answerCall(): void;
  callUser(id: string): void;
  leaveCall(): void;
}

interface ICall {
  isReceivedCall: boolean;
  from: string;
  name: string;
  signal: SignalData;
}

const SocketContext = createContext<ISocketContext>({} as ISocketContext);

const socket = io('http://127.0.0.1:5000');

const SocketProvider: React.FC = ({ children }) => {
  const [stream, setStream] = useState<MediaStream>();
  const [me, setMe] = useState('');
  const [call, setCall] = useState<ICall>({} as ICall);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');

  const myVideo = useRef<any>();
  const userVideo = useRef<any>();
  const connectionRef = useRef<Instance>();

  useEffect(() => {
    console.log('carrl');

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream: MediaStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id: string) => setMe(id));
    socket.on('calluser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = useCallback(() => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', data => {
      socket.emit('answercall', { signal: data, to: call.from });
    });

    peer.on('stream', currentStream => {
      myVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  }, [call.from, call.signal, stream]);

  const callUser = useCallback(
    (id: string) => {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on('signal', data => {
        socket.emit('calluser', {
          userToCall: id,
          signalData: data,
          from: me,
          name,
        });
      });

      peer.on('stream', currentStream => {
        userVideo.current?.addStream(currentStream);
      });

      socket.on('callaccepted', signal => {
        setCallAccepted(true);

        peer.signal(signal);
      });

      connectionRef.current = peer;
    },
    [me, name, stream],
  );

  const leaveCall = useCallback(() => {
    setCallEnded(true);
    connectionRef.current?.destroy();

    window.location.reload();
  }, []);

  return (
    <SocketContext.Provider
      value={{
        stream,
        me,
        call,
        callAccepted,
        callEnded,
        name,
        myVideo,
        userVideo,
        setName,
        answerCall,
        callUser,
        leaveCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

function useSocket(): ISocketContext {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
}

export { SocketProvider, useSocket };
