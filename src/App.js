import { registerRootComponent } from 'expo';
import React from 'react';
import { useState } from 'react';

import Login from './screens/login/Login'
import Routes from './Routes'

export default function App() {
  const [isLogged, setIsLogged] = useState(false)

  return (
    isLogged ? (
      <Routes />
      ) : (
      <Login/>
    )
    
  );
}

registerRootComponent(App)
