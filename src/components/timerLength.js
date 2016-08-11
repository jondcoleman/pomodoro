import React from 'react'

const TimerLengthControl = React.createClass({
  render: function() {
    return (
      <div className={`form-group ${!this.props.valid ? 'has-error': ''}`}>
        <h2 htmlFor="timer-length">Minutes</h2>
        <input
          id="timer-length"
          type="text"
          className="form-control"
          value={this.props.inputValue}
          disabled={this.props.disabled}
          onChange={this.handleChange}
          onKeyPress={this.handleEnter}
        />
      </div>
    )
  },
  handleEnter: function(e) {
    if (e.charCode === 13) {
      this.props.startTimer()
    }
  },
  handleChange: function(e) {
    e.preventDefault()
    this.props.handleInputChange(e.target.value)
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
