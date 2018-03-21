import React, { Component } from 'react';
import Die from './Die';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="flex-container">
          <Die />
          <Die />
          <Die />
        </div>
      </div>
    );
  }
}

export default App;
