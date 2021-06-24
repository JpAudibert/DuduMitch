import React from 'react';
import logo from '../../assets/duduMitch.svg';
import { Container, Header } from './styles';

import VideoPlayer from '../../components/VideoPlayer';
import Options from '../../components/Options';
import Notifications from '../../components/Notifications';

const App: React.FC = () => {
  return (
    <>
      <Container>
        <Header>
          <img src={logo} alt="Logo" />
        </Header>
        <VideoPlayer />
        <Options>
          <Notifications />
        </Options>
      </Container>
    </>
  );
};

export default App;
