import React from 'react';
import OthelloGame from "./main/OthelloGame.js";
import OthelloView from "./main/OthelloView.jsx";
import './App.css';

function App() {
  let game = new OthelloGame();

  return (
    <div className="App">
      <header className="App-header">
        <OthelloView game={game}/>
      </header>
    </div>
  );
}

export default App;
