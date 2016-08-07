import React from 'react'
import getMinSec from '../utils/getMinSec.js'

const CountdownTimer = function(props) {
  return (
    <h2 className="text-center">{getMinSec(props.currentTimer)}</h2>
  )
}

export default CountdownTimer
