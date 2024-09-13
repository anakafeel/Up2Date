import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';

import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
        <Navbar/>
        <News pageSize={8}/>
      </div>
    )
  }
}

