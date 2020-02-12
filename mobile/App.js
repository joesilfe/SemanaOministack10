import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes'

// Ignrando mensagem do websocket, basta passar o começo de qualquer mensagem
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket'
])

export default function App() {
  return (
    <>
      {/* 
        StatusBar: é onde fica a hora, vida da bateria conexão com 3,4g e wifi, é aparte superior 
        barStyle : informa que os dados ficam em branco no statusBar
        backgroundColor: Deixa no android a cor setada
      */}
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
}
