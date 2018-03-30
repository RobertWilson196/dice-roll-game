import React, { Component } from 'react';
import Player from './Player';
import Die from './Die';
import CombatLog from './CombatLog';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {     

      diceValue: 0,
      renderControl: 'playerTurnAttackRoll',
      newRender: '',
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
    // this.attacks = this.attacks.bind(this);
    this.changeTurn = this.changeTurn.bind(this);
    this.handleRoll = this.handleRoll.bind(this);
    
}

  rollDice() { //hardcoded to a d6
    const rollValue = (Math.floor(Math.random() * 6)) + 1;
    return rollValue;
  };

  changeTurn() {
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

  // attacks(attacker, defender) {
  //   const rollValue = this.rollDice();
  //   console.log(attacker.player + " attacks " + defender.player + " for " + rollValue);

  //   let newDefHealth = defender.health - rollValue;
  //   let isDefAlive = true;
  //   if(newDefHealth < 1){
  //     isDefAlive = false;
  //   }
  //   const { player, cpu } = this.state;
  //   let newPlayerState = { ...player };
  //   let newCpuState = { ...cpu };

  //   if(this.state.turn === "Human") {
  //         newPlayerState= {
  //           ...player,
  //           attackValue: rollValue,
  //         };
  //         newCpuState= {
  //           ...cpu,
  //           health: newDefHealth,
  //           isAlive: isDefAlive,
  //         };
  //   } else if (this.state.turn === "CPU") {
  //       newCpuState= {
  //         ...cpu,
  //         attackValue: rollValue,
  //       };
  //       newPlayerState= {
  //         ...player,
  //         health: newDefHealth,
  //         isAlive: isDefAlive,
  //       };
  //   };
  //   this.setState({
  //     player: newPlayerState,
  //     cpu: newCpuState,
  //     diceValue: rollValue,
  //   });
  // };

  handleRoll() {

    const { player, cpu, renderControl } = this.state;
    const rollValue = this.rollDice();

    let newPlayerState = { ...player };
    let newCpuState = { ...cpu };
    let newRender = renderControl;
 
    const playerTurnAttackRoll = "playerTurnAttackRoll";
    const playerTurnDefendRoll = "playerTurnDefendRoll";
    const cpuTurnAttackRoll = "cpuTurnAttackRoll";
    const cpuTurnDefendRoll = "cpuTurnDefendRoll";

    switch(this.state.renderControl) {

      case playerTurnAttackRoll: {
        newPlayerState = {
          ...player,
          attackValue: rollValue,
        };
        this.setState({
          renderControl: cpuTurnDefendRoll,
          diceValue: rollValue,
          player: newPlayerState,
          cpu: newCpuState,
        });
        console.log(this.state.renderControl);
        break;
      } 

      case playerTurnDefendRoll: {
        newPlayerState = {
          ...player,
          defenseValue: rollValue,
        },
        this.setState({
          renderControl: playerTurnAttackRoll,
          diceValue: rollValue,
          player: newPlayerState,
          cpu: newCpuState,
        });
        console.log(this.state.renderControl);
        break;
      }

      case cpuTurnAttackRoll: {
        newCpuState = {
          ...cpu,
          attackValue: rollValue,
        },
        this.setState({
          renderControl: playerTurnDefendRoll,
          diceValue: rollValue,
          player: newPlayerState,
          cpu: newCpuState,
        });
        console.log(this.state.renderControl);
        break;
      }

      case cpuTurnDefendRoll: {
        newCpuState = {
          ...cpu,
          defenseValue: rollValue,
        },
        this.setState({
          renderControl: cpuTurnAttackRoll,
          diceValue: rollValue,
          player: newPlayerState,
          cpu: newCpuState,
        });
        console.log(this.state.renderControl);
        break;
      }

      default: {
        this.setState({ 
          diceValue: rollValue,
          player: newPlayerState,
          cpu: newCpuState,
        });
        console.log('default');
     }
    }
  }

  render() {
    
    const playerTurnAttackRoll = "playerTurnAttackRoll";
    const playerTurnDefendRoll = "playerTurnDefendRoll";
    const cpuTurnAttackRoll = "cpuTurnAttackRoll";
    const cpuTurnDefendRoll = "cpuTurnDefendRoll";

    switch(this.state.renderControl) {

      // ... player (a) -> cpu (d) -> cpu (a) -> player (d) -> player (a) ...

      case playerTurnAttackRoll: {
        return (
          <div className="flex-container-h">
            <Player value = {this.state.player}/>
            <Player value = {this.state.cpu} />
            <Die value = {this.state.diceValue}/>
            <h1>{this.state.renderControl}</h1>
            <button onClick={this.handleRoll}>Attack CPU</button>
          </div>
        );
      }

      case cpuTurnDefendRoll: {
        return (
          <div className="flex-container-h">
            <Player value = {this.state.player}/>
            <Player value = {this.state.cpu} />
            <Die value = {this.state.diceValue}/>
            <h1>{this.state.renderControl}</h1>
            <button onClick={this.handleRoll}>Block Player</button>
            <button onClick={this.handleRoll}>Evade Player</button>
          </div>
        );
      }

      case cpuTurnAttackRoll: {
        return (
          <div className="flex-container-h">
            <Player value = {this.state.player}/>
            <Player value = {this.state.cpu} />
            <Die value = {this.state.diceValue}/>
            <h1>{this.state.renderControl}</h1>
            <button onClick={this.handleRoll}>Attack Player</button>
          </div>
        );
      }

      case playerTurnDefendRoll: {
        return (
          <div className="flex-container-h">
            <Player value = {this.state.player}/>
            <Player value = {this.state.cpu} />
            <Die value = {this.state.diceValue}/>
            <h1>{this.state.renderControl}</h1>
            <button onClick={this.handleRoll}>Block CPU</button>
            <button onClick={this.handleRoll}>Evade CPU</button>
          </div>
        );
      }

      default: 
        return (
          <div className="flex-container-h">
            <h1>Something Broke</h1>
          </div>
        );
    }
  }
}

export default App;
