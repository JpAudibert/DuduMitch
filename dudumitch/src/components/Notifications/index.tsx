import React from 'react';
import { useSocket } from '../../hooks/socket';

import { Container } from './styles';

const Notifications: React.FC = () => {
  const { answerCall, call, callAccepted } = useSocket();

  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <Container>
          <div>
            <span>{call.name} está ligando</span>
            <button type="button" onClick={answerCall}>
              Atender
            </button>
          </div>
        </Container>
      )}
    </>
  );
};

export default Notifications;
