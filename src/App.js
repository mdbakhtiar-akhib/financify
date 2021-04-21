import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Calculator from './components/Calculator'

class App extends Component {

  render() {
    return (
      <div className="App">
        <center><img src={require('./logo.png')} className="logo" /></center>
        <h1><center>Financify!</center></h1>
        <h4><center>Understand your finances better, it's not rocket science.</center></h4>
      <Calculator />
      </div>
    )

  }
}

export default App;
