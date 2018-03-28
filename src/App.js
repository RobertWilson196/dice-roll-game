import React, { Component } from 'react';
import Player from './Player';
import Die from './Die';
import CombatLog from './CombatLog';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {     

      renderControl: playerTurnNeutral,
      turn: "Human",
      //player data
      player : {
        player: "Human",
        health: 15,
        attackValue: 0,
        attackBonus: 0,
        defenseValue: 0,
        defenseBonus: 0,
        isAlive: true,
    },
      //cpu data
      cpu : {
        player: "CPU",
        health: 10,
        attackValue: 0,
        attackBonus: 0,
        defenseValue: 0,
        defenseBonus: 0,
        isAlive: true,
    }
  };
    this.rollDice = this.rollDice.bind(this);
    this.attacks = this.attacks.bind(this);
    this.changeTurn = this.changeTurn.bind(this);

    const playerTurnNeutral = "playerTurnNeutral";
    const playerTurnAttackRoll = "playerTurnAttackRoll";
    const playerTurnDefendRoll = "playerTurnDefendRoll";
    const cpuTurnNeutral = "cpuTurnNeutral";
    const cpuTurnAttackRoll = "cpuTurnAttackRoll";
    const cpuTurnDefendRoll = "cpuTurnDefendRoll";
}

  rollDice() { //hardcoded to a d6
    const rollValue = (Math.floor(Math.random() * 6)) + 1;
    return rollValue;
  };

  changeTurn() {
    console.log(this.state.turn);
    if(this.state.turn === "Human") {
      this.setState({
        turn: "CPU",
      });
    } else if (this.state.turn === "CPU") {
      this.setState({
        turn: "Human",
      });
    };
  };

  attacks(attacker, defender) {
    const rollValue = this.rollDice();
    console.log(attacker.player + " attacks " + defender.player + " for " + rollValue);

    let newDefHealth = defender.health - rollValue;
    let isDefAlive = true;
    if(newDefHealth < 1){
      isDefAlive = false;
    }
    const { player, cpu } = this.state;
    let newPlayerState = { ...player };
    let newCpuState = { ...cpu };

    if(this.state.turn === "Human") {
          newPlayerState= {
            ...player,
            attackValue: rollValue,
          };
          newCpuState= {
            ...cpu,
            health: newDefHealth,
            isAlive: isDefAlive,
          };
    } else if (this.state.turn === "CPU") {
        newCpuState= {
          ...cpu,
          attackValue: rollValue,
        };
        newPlayerState= {
          ...player,
          health: newDefHealth,
          isAlive: isDefAlive,
        };
    };
    this.setState({
      player: newPlayerState,
      cpu: newCpuState,
      diceValue: rollValue,
    });
  };

  render() {
    return (
      <div className="flex-container-h">
        <Player value = {this.state.player}/>
        <Player value = {this.state.cpu} />
        <Die value = {this.state.diceValue}/>

        <button onClick ={ () => {
          this.attacks( (this.state.turn === 'Human' ? this.state.player : this.state.cpu),
          (this.state.turn === 'Human' ? this.state.cpu : this.state.player));
        } }>attack</button>
        <button onClick={this.changeTurn}>change turn</button>
      </div>
    );
  }
}

export default App;
