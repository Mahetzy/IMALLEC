import React, { useState } from 'react';
import { LogIn } from './app/logIn';
import { signUp } from './app/signUp';
import { Welcome } from './app/welcome';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('logIn');

  if (currentScreen === 'logIn') {
    return <LogIn onNavigateToRegister={() => setCurrentScreen('signUp')} />;
  } else {
    return <signUp onNavigateToLogin={() => setCurrentScreen('logIn')} />;
  }
}