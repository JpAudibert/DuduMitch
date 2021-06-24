import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useSocket } from '../../hooks/socket';

import { Container, FieldList, Field } from './styles';

const Options: React.FC = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useSocket();
  const [idToCall, setIdToCall] = useState('');

  return (
    <Container>
      <form noValidate autoComplete="off">
        <FieldList>
          <Field>
            <span>Informações de Contato</span>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Seu Nome"
            />
            <CopyToClipboard text={me}>
              <button type="button">Copiar seu ID</button>
            </CopyToClipboard>
          </Field>

          <Field>
            <span>Faça uma ligação</span>
            <input
              value={idToCall}
              onChange={e => setIdToCall(e.target.value)}
              placeholder="ID para ligar"
            />

            {callAccepted && !callEnded ? (
              <button type="button" onClick={leaveCall}>
                Desligar
              </button>
            ) : (
              <button type="button" onClick={() => callUser(idToCall)}>
                Ligar
              </button>
            )}
          </Field>
        </FieldList>
      </form>
      {children}
    </Container>
  );
};

export default Options;
