import React, { Component } from 'react';
import Player from './Player';
import Die from './Die';
import CombatLog from './CombatLog';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {     
      
      player : {
        Player: "Human",
        Health: 15,
        AttackBonus: 0,
        DefenseBonus: 0,
        IsAlive: true,
        Turn: false,
    },
      cpu : {
        Player: "CPU",
        Health: 10,
        AttackBonus: 0,
        DefenseBonus: 0,
        IsAlive: true,
        Turn: false,
    }
  };
    this.diceRoll = this.diceRoll.bind(this);
}

  diceRoll() {
    let rollValue = (Math.floor(Math.random() * 6)) + 1;
    return rollValue;
  };

  changeTurn() {
    console.log(this.state.playerTurn);
    this.setState({
      playerTurn: !this.state.playerTurn
    });
  }

  render() {

    return (
      <div className="flex-container-h">
        <Player value = {this.state.player}/>
        <Player value = {this.state.cpu} />
        <Die value = {this.state.diceOneValue}/>
        <button onClick={() => 
            this.setState({ 
              diceOneValue: this.diceRoll()
            })}>Roll</button>

      </div>
    );
  }
}

export default App;
