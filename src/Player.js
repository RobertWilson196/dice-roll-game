import React, { Component } from 'react';
import Die from './Die';

class Player extends Component {

    render() {
        return(
            <div>
                <h2>{this.props.value.Player}</h2>
                <h2>Health: {this.props.value.Health}</h2>
                <h2>+Attack: {this.props.value.AttackBonus}</h2>
                <h2>+Defense: {this.props.value.DefenseBonus}</h2>
                <h2>Status: {this.props.value.IsAlive ? "Alive" : "Dead"}</h2>
            </div>
        );
    }
}

export default Player;