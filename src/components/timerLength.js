import React from 'react'

const TimerLengthControl = React.createClass({
  render: function() {
    return (
      <div>
        <label htmlFor="timer-length">Pomodoro Length (minutes)</label>
        <input
          id="timer-length"
          type="text"
          className="form-control"
          // value={this.props.timerLength / 60}
          onBlur={this.handleChange}
        />
      </div>
    )
  },
  handleChange: function(e) {
    e.preventDefault()
    this.props.handleTimerLengthChange(parseInt(e.target.value) * 60)
  }
})

export default TimerLengthControl
