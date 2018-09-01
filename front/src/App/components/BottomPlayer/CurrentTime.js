import React, { Component } from 'react'
import { withMediaProps, utils } from 'react-media-player'
const { formatTime } = utils

class CurrentTime extends Component {
  shouldComponentUpdate({ media }) {
    return this.props.media.currentTime !== media.currentTime
  }

  render() {
    const { className, style, media } = this.props
    return (
      <time className={className} style={style}>
        {formatTime(media.currentTime)}
      </time>
    )
  }
}

export default withMediaProps(CurrentTime)