import React, { Component } from 'react';
import Board from './components/Board';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the Game of Life!</h2>
        </div>
        <Board />
      </div>
    );
  }
}

export default App;
