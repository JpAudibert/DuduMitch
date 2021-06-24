import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useSocket } from '../../hooks/socket';

import { Container, FieldList, Field, Button } from './styles';

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
              <Button type="button">Copiar seu ID</Button>
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
              <Button
                type="button"
                onClick={leaveCall}
                callInProgress={callAccepted}
              >
                Desligar
              </Button>
            ) : (
              <Button type="button" onClick={() => callUser(idToCall)}>
                Ligar
              </Button>
            )}
          </Field>
        </FieldList>
      </form>
      {children}
    </Container>
  );
};

export default Options;
