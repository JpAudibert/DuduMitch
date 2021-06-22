import React from 'react';
import Main from './pages/Main';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Main />
    </>
  );
};

export default App;
