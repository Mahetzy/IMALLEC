import React, { useState } from 'react';
import { Login } from './app/login'; // O la ruta donde tengas tu login
import { Registro } from './app/registro'; // Tu pantalla de registro

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  if (currentScreen === 'login') {
    return <Login onNavigateToRegister={() => setCurrentScreen('registro')} />;
  } else {
    return <Registro onNavigateToLogin={() => setCurrentScreen('login')} />;
  }
}