import React from 'react';
import api from './services/api'

import Main from './components/Main/Main'
import Aside from './components/Aside/Aside'

import './global.css'
import './App.css'

function App() {

  return (
    <div className="App">
      <Aside api={api} />
      <Main api={api} />
    </div>
  );
}

export default App;
