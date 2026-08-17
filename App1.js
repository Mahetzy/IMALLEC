import React, { useState } from 'react';
import { Login } from './app/login';
import { Registro } from './app/registro';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  if (currentScreen === 'login') {
    return <Login onNavigateToRegister={() => setCurrentScreen('registro')} />;
  } else {
    return <Registro onNavigateToLogin={() => setCurrentScreen('login')} />;
  }
}