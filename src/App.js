import React, { Component } from 'react';
import Player from './Player';
import Die from './Die';
// import CombatLog from './CombatLog';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {     

      playerDice: 0,
      cpuDice: 0,
      renderControl: 'playerTurnAttackRoll',
      newRender: '',
      turn: "Human",
      //player data
      player : {
        player: "Human",
        health: 15,
        attackValue: 0,
        defenseValue: 0,
        isAlive: true,
    },
      //cpu data
      cpu : {
        player: "CPU",
        health: 10,
        attackValue: 0,
        defenseValue: 0,
        isAlive: true,
    }
  };

    this.rollDice = this.rollDice.bind(this);
    this.changeTurn = this.changeTurn.bind(this);
    this.handleAttackRoll = this.handleAttackRoll.bind(this);
    this.handleDefendRoll = this.handleDefendRoll.bind(this);
    this.handleEvadeRoll = this.handleEvadeRoll.bind(this);
    
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

  handleAttackRoll() {

    const { player, cpu } = this.state;
    const rollValue = this.rollDice();

    let newPlayerState = { ...player };
    let newCpuState = { ...cpu };

    const playerTurnAttackRoll = "playerTurnAttackRoll";
    const cpuTurnAttackRoll = "cpuTurnAttackRoll";
    const playerTurnDefendRoll = "playerTurnDefendRoll";
    const cpuTurnDefendRoll = "cpuTurnDefendRoll";

    switch(this.state.renderControl) {

      case playerTurnAttackRoll: {
        newPlayerState = {
          ...player,
          attackValue: rollValue,
        };
        this.setState({
          renderControl: cpuTurnDefendRoll,
          playerDice: rollValue,
          player: newPlayerState,
          cpu: newCpuState,
        });
        break;
      } 
      
      case cpuTurnAttackRoll: {
        newCpuState = {
          ...cpu,
          attackValue: rollValue,
        };
        this.setState({
          renderControl: playerTurnDefendRoll,
          cpuDice: rollValue,
          player: newPlayerState,
          cpu: newCpuState,
        });
        break;
      }

      default: {
        this.setState({ 
          diceValue: rollValue,
          player: newPlayerState,
          cpu: newCpuState,
        });
        console.log('error');
      }
    }
  }

  handleDefendRoll() {

    const { player, cpu } = this.state;
    const rollValue = this.rollDice();

    let newPlayerState = { ...player };
    let newCpuState = { ...cpu };

    const playerTurnAttackRoll = "playerTurnAttackRoll";
    const cpuTurnAttackRoll = "cpuTurnAttackRoll";
    const playerTurnDefendRoll = "playerTurnDefendRoll";
    const cpuTurnDefendRoll = "cpuTurnDefendRoll";

    switch(this.state.renderControl) {

      case playerTurnDefendRoll: {
        let newHealth = player.health;
        let damageRoll = ((cpu.attackValue - rollValue > 1) ? (cpu.attackValue - rollValue) : 1);
        newHealth -= damageRoll;
        newPlayerState = {
          ...player,
          health: newHealth,
          defenseValue: rollValue,
        };
        let eventLog = ("CPU attacks with " + cpu.attackValue +
        ". Player defends with " + rollValue + ". Player takes " + damageRoll + " damage.");
        console.log(eventLog);
        this.setState({
          renderControl: playerTurnAttackRoll,
          playerDice: rollValue,
          player: newPlayerState,
          cpu: newCpuState,
        });
        break;
      }

      case cpuTurnDefendRoll: {
        let newHealth = cpu.health;
        let damageRoll = ((player.attackValue - rollValue > 1) ? (player.attackValue - rollValue) : 1);
        newHealth -= damageRoll;
        newCpuState = {
          ...cpu,
          health: newHealth,
          defenseValue: rollValue,
        };
        let eventLog = ("Player attacks with " + player.attackValue +
        ". CPU defends with " + rollValue + ". CPU takes " + damageRoll + " damage.");
        console.log(eventLog);
        this.setState({
          renderControl: cpuTurnAttackRoll,
          cpuDice: rollValue,
          player: newPlayerState,
          cpu: newCpuState,
        });
        break;
      }

      default: {
        this.setState({ 
          diceValue: rollValue,
          player: newPlayerState,
          cpu: newCpuState,
        });
        console.log('error');
     }
    }
  }

  handleEvadeRoll() {

    const { player, cpu, } = this.state;
    const rollValue = this.rollDice();

    let newPlayerState = { ...player };
    let newCpuState = { ...cpu };

    const playerTurnAttackRoll = "playerTurnAttackRoll";
    const cpuTurnAttackRoll = "cpuTurnAttackRoll";
    const playerTurnDefendRoll = "playerTurnDefendRoll";
    const cpuTurnDefendRoll = "cpuTurnDefendRoll";

    switch(this.state.renderControl) {

      case playerTurnDefendRoll: {
        let newHealth = player.health;
        let damageRoll = 0;
        if(cpu.attackValue > rollValue) {
          newHealth = player.health - cpu.attackValue;
          damageRoll = cpu.attackValue;
        }
        newPlayerState = {
          ...player,
          health: newHealth,
          defenseValue: rollValue,
        };
        let eventLog = ("CPU attacks with " + cpu.attackValue +
        ". Player evades with " + rollValue + ". Player takes " + damageRoll + " damage.");
        console.log(eventLog);
        this.setState({
          renderControl: playerTurnAttackRoll,
          playerDice: rollValue,
          player: newPlayerState,
          cpu: newCpuState,
        });
        break;
      }

      case cpuTurnDefendRoll: {
        let newHealth = cpu.health;
        let damageRoll = 0;
        if(player.attackValue > rollValue) {
          newHealth = cpu.health - player.attackValue;
          damageRoll = player.attackValue;
        }
        newCpuState = {
          ...cpu,
          health: newHealth,
          defenseValue: rollValue,
        };
        let eventLog = ("Player attacks with " + player.attackValue +
        ". CPU evades with " + rollValue + ". CPU takes " + damageRoll + " damage.");
        console.log(eventLog);
        this.setState({
          renderControl: cpuTurnAttackRoll,
          cpuDice: rollValue,
          player: newPlayerState,
          cpu: newCpuState,
        });
        break;
      }

      default: {
        this.setState({ 
          diceValue: rollValue,
          player: newPlayerState,
          cpu: newCpuState,
        });
        console.log('error');
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
            <Die value = {this.state.playerDice}/>
            <Player value = {this.state.cpu} />
            <Die value = {this.state.cpuDice}/>
            
            <button onClick={this.handleAttackRoll}>Attack CPU</button>
          </div>
        );
      }

      case cpuTurnDefendRoll: {
        return (
          <div className="flex-container-h">
            <Player value = {this.state.player}/>
            <Die value = {this.state.playerDice}/>
            <Player value = {this.state.cpu} />
            <Die value = {this.state.cpuDice}/>
            <button onClick={this.handleDefendRoll}>Block Player</button>
            <button onClick={this.handleEvadeRoll}>Evade Player</button>
          </div>
        );
      }

      case cpuTurnAttackRoll: {
        return (
          <div className="flex-container-h">
            <Player value = {this.state.player}/>
            <Die value = {this.state.playerDice}/>
            <Player value = {this.state.cpu} />
            <Die value = {this.state.cpuDice}/>
            <button onClick={this.handleAttackRoll}>Attack Player</button>
          </div>
        );
      }

      case playerTurnDefendRoll: {
        return (
          <div className="flex-container-h">
            <Player value = {this.state.player}/>
            <Die value = {this.state.playerDice}/>
            <Player value = {this.state.cpu} />
            <Die value = {this.state.cpuDice}/>
            <button onClick={this.handleDefendRoll}>Block CPU</button>
            <button onClick={this.handleEvadeRoll}>Evade CPU</button>
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
