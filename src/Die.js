import React, { Component } from 'react';

class Die extends Component {
    constructor(){
        super();
        this.state = {
            diceValue: 0,
        }
    }
    render(){
        return(
            <div className="die"> 
                <h1>{this.props.value}</h1>
            </div>
            );
    }
}

export default Die;