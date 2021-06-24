import React from 'react';
import { useSocket } from '../../hooks/socket';

import { Container } from './styles';

const Notifications: React.FC = () => {
  const { answerCall, call, callAccepted } = useSocket();

  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <Container>
          <h1>{call.name} está ligando</h1>
          <button type="button" onClick={answerCall}>
            Atender
          </button>
        </Container>
      )}
    </>
  );
};

export default Notifications;
