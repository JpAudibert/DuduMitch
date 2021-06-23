import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  createContext,
} from 'react';
import { io } from 'socket.io-client';
import Peer, { Instance } from 'simple-peer';
import { Socket } from 'dgram';

interface ISocketContext {
  stream: MediaStream;
  me: string;
  call: any;
  callAccepted: boolean;
  callEnded: boolean;
  name: string;
  myVideo: Instance;
  userVideo: Instance;
  setName(name: string): void;
  answerCall(): void;
  callUser(id: string): void;
  leaveCall(): void;
}

const SocketContext = createContext<ISocketContext>({} as ISocketContext);

const socket = io('https://doodle-meet.herokuapp.com');

const SocketProvider = ({ children }) => {
  const [stream, setStream] = useState<MediaStream>();
  const [me, setMe] = useState('');
  const [call, setCall] = useState<any>({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');

  const myVideo = useRef<Instance>();
  const userVideo = useRef<Instance>();
  const connectionRef = useRef<Instance>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream: MediaStream) => {
        setStream(currentStream);

        myVideo.current?.addStream(currentStream);
      });

    socket.on('me', (id: string) => setMe(id));
    socket.on('calluser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
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
      userVideo.current?.addStream(currentStream);
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id: string) => {
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
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current?.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
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
      leaveCall
    }}
    >{children}
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
