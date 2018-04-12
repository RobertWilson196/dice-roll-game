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
      winner: '',
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
    this.handleAttackRoll = this.handleAttackRoll.bind(this);
    this.handleDefendRoll = this.handleDefendRoll.bind(this);
    this.handleEvadeRoll = this.handleEvadeRoll.bind(this);
    this.reset = this.reset.bind(this);
    
}

  rollDice() { //hardcoded to a d6
    const rollValue = (Math.floor(Math.random() * 6)) + 1;
    return rollValue;
  };


  handleAttackRoll(char) {

    const attacker = this.state[char];
    const rollValue = this.rollDice();
    this.setState({
      renderControl: char==="player" ? "cpuTurnDefendRoll": "playerTurnDefendRoll",
      [char+"Dice"]: rollValue,
      [char]: {
        ...attacker,
        attackValue: rollValue,
      },
    });
  }

  handleDefendRoll(char) {

    const { player, cpu } = this.state;
    const defender = this.state[char];
    const rollValue = this.rollDice();
    let damageRoll = 0;
    let eventLog = '';

    if(char==="player") {
      damageRoll = ((cpu.attackValue - rollValue > 1) ? (cpu.attackValue - rollValue) : 1);
      eventLog = ("CPU attacks with " + cpu.attackValue +
      ". Player defends with " + rollValue + ". Player takes " + damageRoll + " damage.");
      
    } else {
      damageRoll = ((player.attackValue - rollValue > 1) ? (player.attackValue - rollValue) : 1);
      eventLog = ("Player attacks with " + player.attackValue +
    ". CPU defends with " + rollValue + ". CPU takes " + damageRoll + " damage.");
    }

    let tempHealth = defender.health - damageRoll;
    if(tempHealth <= 0) {
      this.setState({
        renderControl: 'endGame',
        winner: char==="player" ? "CPU" : "Player",
        [char+"Dice"]: rollValue,
        [char]: {
          ...defender,
          defenseValue: rollValue,
          health: defender.health - damageRoll,
          isAlive: false,
        },
      });
    } else { 
      this.setState({
        renderControl: char==="player" ? "playerTurnAttackRoll": "cpuTurnAttackRoll",
        [char+"Dice"]: rollValue,
        [char]: {
          ...defender,
          defenseValue: rollValue,
          health: defender.health - damageRoll,
        },
      });
    }
    console.log(eventLog);
  }

  handleEvadeRoll(char) {
    const { player, cpu } = this.state;
    const defender = this.state[char];
    const rollValue = this.rollDice();
    let damageRoll = 0;
    let eventLog = '';

    if(char==="player") {
      damageRoll = (rollValue > cpu.attackValue ? 0 : cpu.attackValue);
      eventLog = ("CPU attacks with " + cpu.attackValue +
      ". Player evades with " + rollValue + ". Player takes " + damageRoll + " damage.");
    } else {
      damageRoll = (rollValue > player.attackValue ? 0 : player.attackValue);
      eventLog = ("Player attacks with " + player.attackValue +
    ". CPU evades with " + rollValue + ". CPU takes " + damageRoll + " damage.");
    }

    let tempHealth = defender.health - damageRoll;
    if(tempHealth <= 0) {
      this.setState({
        renderControl: 'endGame',
        winner: char==="player" ? "CPU" : "Player",
        [char+"Dice"]: rollValue,
        [char]: {
          ...defender,
          defenseValue: rollValue,
          health: defender.health - damageRoll,
          isAlive: false,
        },
      });
    } else { 
      this.setState({
        renderControl: char==="player" ? "playerTurnAttackRoll": "cpuTurnAttackRoll",
        [char+"Dice"]: rollValue,
        [char]: {
          ...defender,
          defenseValue: rollValue,
          health: defender.health - damageRoll,
        },
      });
    }
    console.log(eventLog);
  }

  reset() {
    this.setState({
      playerDice: 0,
      cpuDice: 0,
      renderControl: 'playerTurnAttackRoll',
      winner: '',
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
    });
  }

  render() {
    
    const playerTurnAttackRoll = "playerTurnAttackRoll";
    const playerTurnDefendRoll = "playerTurnDefendRoll";
    const cpuTurnAttackRoll = "cpuTurnAttackRoll";
    const cpuTurnDefendRoll = "cpuTurnDefendRoll";
    const endGame = "endGame";

    switch(this.state.renderControl) {

      // ... player (a) -> cpu (d) -> cpu (a) -> player (d) -> player (a) ...

      case playerTurnAttackRoll: {
        return (
          <div>
            <div className="flex-container-h">
              <Player value = {this.state.player}/>
              <Die value = {this.state.playerDice}/>
              <Player value = {this.state.cpu} />
              <Die value = {this.state.cpuDice}/>
            </div>
            <div className="flex-container-h">
              <button onClick={() => this.handleAttackRoll('player')}>Attack CPU</button>
            </div>
          </div>
        );
      }

      case cpuTurnDefendRoll: {
        return (
          <div>
            <div className="flex-container-h">
              <Player value = {this.state.player}/>
              <Die value = {this.state.playerDice}/>
              <Player value = {this.state.cpu} />
              <Die value = {this.state.cpuDice}/>
            </div>
            <div className="flex-container-h">
              <button onClick={() => this.handleDefendRoll('cpu')}>Block Player</button>
              <button onClick={() => this.handleEvadeRoll('cpu')}>Evade Player</button>
            </div>
          </div>
        );
      }

      case cpuTurnAttackRoll: {
        return (
          <div>
            <div className="flex-container-h">
              <Player value = {this.state.player}/>
              <Die value = {this.state.playerDice}/>
              <Player value = {this.state.cpu} />
              <Die value = {this.state.cpuDice}/>
            </div>
            <div className="flex-container-h">
              <button onClick={() => this.handleAttackRoll('cpu')}>Attack Player</button>
            </div>
          </div>
        );
      }

      case playerTurnDefendRoll: {
        return (
          <div>
            <div className="flex-container-h">
              <Player value = {this.state.player}/>
              <Die value = {this.state.playerDice}/>
              <Player value = {this.state.cpu} />
              <Die value = {this.state.cpuDice}/>
            </div>
            <div className="flex-container-h">
              <button onClick={() => this.handleDefendRoll('player')}>Block CPU</button>
              <button onClick={() => this.handleEvadeRoll('player')}>Evade CPU</button>
            </div>
          </div>
        );
      }
      case endGame: {
        return (
          <div>
            <div className="flex-container-h">
              <Player value = {this.state.player}/>
              <Die value = {this.state.playerDice}/>
              <Player value = {this.state.cpu} />
              <Die value = {this.state.cpuDice}/>
            </div>
            <div className="flex-container-h">
              <h3>Winner: {this.state.winner}</h3>
              <div className="flex-container-h">
                <button onClick={() => this.reset()}>Restart Game</button>
              </div>
            </div>
          </div>
        );
      }

      default: 
        return (
          <div>
            <h1>Something Broke</h1>
          </div>
        );
    }
  }
}

export default App;
