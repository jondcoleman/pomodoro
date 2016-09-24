import React, { Component } from 'react'

class Audio extends Component {
  componentWillReceiveProps(newProps) {
    const audio = this.refs.audio
    if (newProps.play) {
      audio.play()
    } else {
      audio.pause()
      audio.currentTime = 0
    }
  }
  render() {
    return <audio src={this.props.src} loop ref="audio" />
  }
}

export default Audio
