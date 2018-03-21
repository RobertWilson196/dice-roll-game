import React, { Component } from 'react';
import Die from './Die';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      diceTotal: 0
    }
  }

  render() {
    return (
      <div className="flex-container">
        <Die />
        <Die />
        <Die />
      </div>
    );
  }
}

export default App;
