import React, { Component } from 'react';

class Die extends Component {
    constructor() {
        super();
        this.state = {
            diceValue: 0
        };
        this.diceRoll = this.diceRoll.bind(this);
    }

  diceRoll(){
    let rollValue = (Math.floor(Math.random() * 6)) + 1;
    this.setState({diceValue: rollValue});
    return rollValue;
  }
    render(){
        return(
            <div> 
                <h1>{this.state.diceValue}</h1>
                <button onClick={() => this.diceRoll()}>Roll Dice</button>
            </div>
            );
    }
}

export default Die;