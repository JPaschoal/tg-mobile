import { registerRootComponent } from 'expo';
import React from 'react';

import Routes from './Routes'
import { AuthProvider } from './contexts/Auth'

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

registerRootComponent(App)
