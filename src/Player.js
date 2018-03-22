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

    attacks(attackingPlayer, defendingPlayer) {
        const attackingValue = attackingPlayer.rollDie() + attackingPlayer.playerAttackBonus;
        const defendingValue = defendingPlayer.rollDie() + defendingPlayer.playerDefenseBonus;
        let damage = 0;
        if(defendingValue > attackingValue) {
            damage = 1;
            return `Successful block. ${damage}damage.`
        } else if (attackingValue > defendingValue) {
            damage = attackingValue - defendingValue;
        }
        defendingPlayer.playerHealth -= damage;
        return `Failed block. ${damage} damage.`
    }

    //do I need a defense method?

    evades(attackingPlayer, defendingPlayer) {
        const attackingValue = attackingPlayer.rollDie() + attackingPlayer.playerAttackBonus;
        const defendingValue = defendingPlayer.rollDie() + defendingPlayer.playerDefenseBonus;
        const damage = attackingValue - defendingValue;
        if(defendingValue > attackingValue) {
            return 'Miss';
        } else if (attackingValue > defendingValue) {
            defendingPlayer.playerHealth -= damage;
            return `Defender takes ${damage} damage.`
        }
    }
    render() {
        return(
            <div>
                <h2>Player</h2>
                <h2>Health: {this.playerHeath}</h2>
                <h2>Bonus Attack: {this.playerAttackBonus}</h2>
                <h2>Bonus Defense: {this.playerDefenseBonus}</h2>
                <h2>Status: {this.playerIsAlive}</h2>
            </div>
        );
    }
}

export default Player;