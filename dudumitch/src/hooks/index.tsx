import React from 'react';

import { SocketProvider } from './socket';

const AppProvider: React.FC = ({ children }) => (
  <SocketProvider>{children}</SocketProvider>
);

export default AppProvider;
