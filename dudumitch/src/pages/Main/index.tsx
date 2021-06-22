import React from 'react';
import logo from '../../assets/duduMitch.svg';
import { Header } from './styles';

const App: React.FC = () => {
  return (
    <>
      <Header>
        <img src={logo} alt="logo" />
      </Header>
    </>
  );
};

export default App;
