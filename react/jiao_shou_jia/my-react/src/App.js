import React from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './test/test'
import TransitionGroupCom from './TransitionGroup/TransitionGroup'

let imgs = ['./img/1.jpg', './img/2.jpg', './img/3.jpg', './img/4.jpg', './img/5.jpg'];

function App() {
  return (
    <div className="App">
      <Test imgs = {imgs}/>
      <TransitionGroupCom/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
