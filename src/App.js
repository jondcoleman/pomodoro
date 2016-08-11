require('offline-plugin/runtime').install()

import React from 'react'
import './App.css'
import TimerLengthControl from './components/timerLength.js'
import StartButton from './components/startButton.js'
import TimerFinished from './components/timerFinished.js'
import ResetButton from './components/resetButton.js'
import calculateRemainingPercent from './utils/calculateRemainingPercent.js'
import CircleProgress from './components/progressCircle.js'
import './vendor/circle-progressbar.css'
import store from 'store'

window.addEventListener('beforeunload', (e) => 'Are you sure you want to leave?')

const App = React.createClass({
  getInitialState: function() {
    return {
      inputValue: 60,
      timerLength: 60, // seconds
      currentTimer: 60,
      breakLength: 60,
      breakTimer: 60,
      status: 'pending',
      valid: true
    }
  },
  componentDidMount: function() {
    const pomodoro = store.get('pomodoro')
    if (pomodoro) {
      this.setState({
        timerLength: pomodoro.timer.length,
        currentTimer: pomodoro.timer.length,
        inputValue: pomodoro.timer.length / 60
      })
    }
    Notification.requestPermission()
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
              inputValue={this.state.inputValue}
              disabled={this.state.status === 'running'}
              valid={this.state.valid}
              handleTimerLengthChange={this.handleTimerLengthChange}
              handleInputChange={this.handleInputChange}
              handleValidation={this.handleValidation}
              startTimer={this.startTimer}
            />
          <CircleProgress
            percentage={calculateRemainingPercent(this.state.currentTimer, this.state.timerLength)}
            timeRemaining={this.state.currentTimer}
          />
          <StartButton
            startTimer={this.startTimer}
            disabled={!this.state.valid || this.state.status === 'running'}
          />
          <ResetButton reset={this.resetTimer} />
          </div>
        </div>
      </div>
    )
  },
  handleInputChange: function(value) {
    this.setState({
      inputValue: value
    })
  },
  handleTimerLengthChange: function(length) {
    this.setState({
      timerLength: length,
      currentTimer: length
    })
    store.set('pomodoro', { timer: { length } })
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
        new Notification('Timer\'s Up!')
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
  },
  handleValidation: function(valid) {
    this.setState({ valid })
  }
})

export default App


// <RemainingCircle
//   percent={calculateRemainingPercent(this.state.timerLength, this.state.currentTimer)}
//   remainingTime={this.state.currentTimer}
// />
