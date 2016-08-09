import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TimerLengthControl from './components/timerLength.js'
import StartButton from './components/startButton.js'
import TimerFinished from './components/timerFinished.js'
import ResetButton from './components/resetButton.js'
import RemainingCircle from './components/remainingCircle.js'
import calculateRemainingPercent from './utils/calculateRemainingPercent.js'

const App = React.createClass({
  getInitialState: function() {
    return {
      timerLength: 10, // seconds
      currentTimer: 10,
      breakLength: 300,
      breakTimer: 300,
      status: 'pending'
    }
  },
  render: function() {
    if (this.state.status === 'finished') return (
      <TimerFinished reset={this.resetTimer} />
    )
    return (
      <div className="container App">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <TimerLengthControl
              timerLength={this.state.timerLength}
              handleTimerLengthChange={this.handleTimerLengthChange}
            />
          <StartButton startTimer={this.startTimer} />
          <ResetButton reset={this.resetTimer} />
          <RemainingCircle
            percent={calculateRemainingPercent(this.state.timerLength, this.state.currentTimer)}
            remainingTime={this.state.currentTimer}
          />
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
    this.setState({ status: 'running' })
    const timer = setInterval(() => {
      // clear the timer if it is is done and set the state to finished
      if (this.state.status === 'pending') {
        clearInterval(timer)
        return
      }
      if (this.state.currentTimer === 0) {
        this.setState({ status: 'finished' })
        clearInterval(timer)
        return
      }
      // decrement the timer each time
      this.setState({ currentTimer: this.state.currentTimer - 1 })
    }, 1000)
  },
  resetTimer: function() {
    this.setState({
      status: 'pending',
      currentTimer: this.state.timerLength
    })
  }
})

export default App
