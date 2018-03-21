import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      diceOne: 0
    }
    this.diceRoll = this.diceRoll.bind(this);
  }

  diceRoll(){
    let rollValue = (Math.floor(Math.random() * 6)) + 1;
    this.setState({diceOne: rollValue});
    return rollValue;
  }

  render() {
    return (
      <div>
        <h1>{this.state.diceOne}</h1>
        <button onClick={() => this.diceRoll()}>Roll Dice</button>
      </div>
    );
  }
}

export default App;
