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
          <span>{name || 'Nome de Usuário'}</span>
          <video playsInline muted ref={myVideo} autoPlay />
        </div>
      )}

      {callAccepted && !callEnded && (
        <div>
          <span>{call.name || 'Convidado'}</span>
          <video playsInline ref={userVideo} autoPlay>
            <track kind="captions" />
          </video>
        </div>
      )}
    </Container>
  );
};

export default VideoPlayer;
