import React, { Component } from 'react';
import Die from './Die';

class Player extends Component {

    render() {
        return(
            <div>
                <h2>{this.props.value.player}</h2>
                <h2>Health: {this.props.value.health}</h2>
                <h2>+Attack: {this.props.value.attackBonus}</h2>
                <h2>+Defense: {this.props.value.defenseBonus}</h2>
                <h2>Status: {this.props.value.isAlive ? "Alive" : "Dead"}</h2>
            </div>
        );
    }
}

export default Player;