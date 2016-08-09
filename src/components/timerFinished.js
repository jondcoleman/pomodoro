import React from 'react'
import ResetButton from './resetButton.js'

const TimerFinished = (props) => (
  <div>
    <h1>Timer Finished!</h1>
    <ResetButton {...props} />
  </div>
)

export default TimerFinished
