import React from 'react'

const StartButton = function(props) {
  return (
    <button
      id="start-pomodoro"
      className="btn btn-default pom-button"
      disabled={props.disabled}
      onClick={props.startTimer}
    >Start</button>
  )
}

export default StartButton
