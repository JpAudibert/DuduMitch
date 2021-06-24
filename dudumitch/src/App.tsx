import React from 'react';
import AppProvider from './hooks';
import Main from './pages/Main';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppProvider>
        <Main />
      </AppProvider>
    </>
  );
};

export default App;
