import React, { Component } from 'react';
import Player from './Player';
import Die from './Die';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="flex-container-h">
        <div className="flex-container-v">
          {/* <Player /> */}
          <Die />
        </div>
        <div className="flex-container-v">
          {/* <Player /> */}
          <Die />
        </div>
      </div>
    );
  }
}

export default App;
