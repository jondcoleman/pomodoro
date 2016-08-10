import React from 'react'

const ResetButton = function(props) {
  return (
    <button
      id="reset"
      className="btn btn-danger pom-button"
      onClick={props.reset}
    >Reset</button>
  )
}

export default ResetButton
