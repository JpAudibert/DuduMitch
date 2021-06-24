import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useSocket } from '../../hooks/socket';

import { Container } from './styles';

const Options: React.FC = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useSocket();
  const [idToCall, setIdToCall] = useState('');

  return (
    <Container>
      <form noValidate autoComplete="off">
        <div>
          <h6>Informações de Contato</h6>
          <input value={name} onChange={e => setName(e.target.value)} />
          <CopyToClipboard text={me}>
            <button type="button">Copiar seu ID</button>
          </CopyToClipboard>
        </div>

        <div>
          <h6>Faça uma ligação</h6>
          <input value={name} onChange={e => setIdToCall(e.target.value)} />

          {callAccepted && !callEnded ? (
            <button type="button" onClick={leaveCall}>
              Desligar
            </button>
          ) : (
            <button type="button" onClick={() => callUser(idToCall)}>
              Ligar
            </button>
          )}
        </div>
      </form>
      {children}
    </Container>
  );
};

export default Options;
