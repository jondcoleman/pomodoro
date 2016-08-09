import React from 'react'
import '../vendor/circle.css'
import getMinSec from '../utils/getMinSec'

const RemainingCircle = (props) => (
  <div className={`c100 p${props.percent} center`}>
    <span>{getMinSec(props.remainingTime)}</span>
    <div className="slice">
      <div className="bar"></div>
      <div className="fill"></div>
    </div>
  </div>
)

export default RemainingCircle
