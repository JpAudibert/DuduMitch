import React from 'react';
import { useSocket } from '../../hooks/socket';

import { Container } from './styles';

const VideoPlayer: React.FC = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useSocket();

  return (
    <Container>
      {stream && (
        <div>
          <h5>{name || 'Nome de Usuário'}</h5>
          <video playsInline muted ref={myVideo} autoPlay />
        </div>
      )}

      {callAccepted && !callEnded && (
        <div>
          <h5>{call.name || 'Convidado'}</h5>
          <video playsInline ref={userVideo} autoPlay>
            <track kind="captions" />
          </video>
        </div>
      )}
    </Container>
  );
};

export default VideoPlayer;
