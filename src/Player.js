import React, { Component } from 'react';

class Player extends Component {
    constructor() {
        super();
        this.state = {
            playerHealth: 10,
            playerAttackBonus: 0,
            playerDefenseBonus: 0,
            playerIsAlive: true,
            playersTurn: false,
        }
    }
    render() {
        return(
            <div>
                Player
            </div>
        );
    }
}

export default Player;