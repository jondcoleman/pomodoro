require('offline-plugin/runtime').install()

import './vendor/circle-progressbar.css'
import './App.css'
import React from 'react'
import store from 'store'
import Favico from 'favico.js'
import Audio from './components/audio.js'
import StartButton from './components/startButton.js'
import ResetButton from './components/resetButton.js'
import TimerFinished from './components/timerFinished.js'
import CircleProgress from './components/progressCircle.js'
import TimerLengthControl from './components/timerLength.js'
import calculateRemainingPercent from './utils/calculateRemainingPercent.js'

const soundUrl = 'https://s3.amazonaws.com/jc-static-assets/Turn.mp3'

window.addEventListener('beforeunload', (e) => {
  e.returnValue = 'something' // custom message not available
})
Notification.requestPermission()

const favicon = new Favico({
    animation:'slide'
})

const App = React.createClass({
  getInitialState: function() {
    return {
      inputValue: 1,
      timerLength: 60, // seconds
      currentTimer: 60,
      breakLength: 60,
      breakTimer: 60,
      status: 'pending',
      valid: true
    }
  },
  componentDidMount: function() {
    // set state from local storage if it's there
    const pomodoro = store.get('pomodoro')
    if (pomodoro) {
      this.setState({
        timerLength: pomodoro.timer.length,
        currentTimer: pomodoro.timer.length,
        inputValue: pomodoro.timer.length / 60
      })
    }
  },
  renderMain: function() {
    return (
      <div>
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
    )
  },
  render: function() {
    return (
      <div className="container App">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
          <Audio src={soundUrl} play={this.state.status === 'finished'} />
            {
              this.state.status === 'finished'
              ? <TimerFinished reset={this.resetTimer} />
              : this.renderMain()
            }
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
    let min = Math.ceil(this.state.currentTimer / 60)
    favicon.badge(min)
    const timer = setInterval(() => {
      // clear the timer if it is is done and set the state to finished
      if (this.state.status === 'pending') {
        clearInterval(timer)
        return
      }

      // check if minutes have changed and update badge if so
      let curMin = Math.ceil(this.state.currentTimer / 60)
      if (min > curMin) {
        min--
        favicon.badge(curMin)
      }

      // timer done
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
    favicon.reset()
  },
  handleValidation: function(valid) {
    this.setState({ valid })
  }
})

export default App
