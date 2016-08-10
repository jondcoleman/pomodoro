import React from 'react'

const TimerLengthControl = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.timerLength / 60
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({ value: nextProps.timerLength / 60 })
  },
  render: function() {
    return (
      <div className={`form-group ${!this.props.valid ? 'has-error': ''}`}>
        <label htmlFor="timer-length">Pomodoro Length (minutes)</label>
        <input
          id="timer-length"
          type="text"
          className="form-control"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    )
  },
  handleChange: function(e) {
    e.preventDefault()
    this.setState({ value: e.target.value })
    const min = +e.target.value
    console.log(min)
    if (isNaN(min)) {
      this.props.handleValidation(false)
      return
    }
    this.props.handleValidation(true)
    this.props.handleTimerLengthChange(min * 60)
  }
})

export default TimerLengthControl
