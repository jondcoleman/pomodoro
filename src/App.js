import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TimerLengthControl from './components/timerLength.js'
import StartButton from './components/startButton.js'
import CountdownTimer from './components/countdownTimer.js'

const App = React.createClass({
  getInitialState: function() {
    return {
      timerLength: 1500, // seconds
      currentTimer: 1500,
      breakLength: 300,
      breakTimer: 300
    }
  },
  render: function() {
    return (
      <div className="container App">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <TimerLengthControl
              timerLength={this.state.timerLength}
              handleTimerLengthChange={this.handleTimerLengthChange}
            />
          <StartButton startTimer={this.startTimer} />
          <CountdownTimer currentTimer={this.state.currentTimer} />
          </div>
        </div>
      </div>
    )
  },
  handleTimerLengthChange: function(length) {
    this.setState({
      timerLength: length,
      currentTimer: length
    })
  },
  startTimer: function() {
    setInterval(() => this.setState({ currentTimer: this.state.currentTimer - 1 }), 1000)
  }
})

export default App
