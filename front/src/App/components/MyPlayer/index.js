import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

import { toggleMyplayer } from 'src/redux/meta/actions.js'
import {
  onPlay,
  onPause,
  playNexSong,
  playPrevSong,
  changeMyPlayerCurrentTime
} from 'src/redux/player/actions'
import Slider from 'src/App/components/Slider/'
import { formatSeconds } from 'src/utils/NumberUtils'

import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'MyPlayer'

class MyPlayer extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleClose = () => {
    this.props.toggleMyplayer()
  }

  togglePlay = () => {
    const { player, onPause, onPlay } = this.props
    player.isPlaying ? onPause() : onPlay()
  }

  render() {
    const [songId, songTitle, songUrl, songDuration] = this.props.song
    const { currentTime, muted } = this.props.player
    const volume = muted ? 0 : this.props.volume
    return (
      <div
        className={cx(`${moduleName}`)}
        style={{ display: this.props.showMyplayer ? '' : 'none' }}
      >
        <div onClick={this.handleClose} className={cx(`${moduleName}-close`)} />
        <div className={cx(`${moduleName}-top`)}>
          <div className={cx(`${moduleName}-top-musicCard`)}>
            <div className={cx(`${moduleName}-top-musicCard-coverImg`)}>
              앨범이미지
            </div>
            <div className={cx(`${moduleName}-top-musicCard-songInfo`)}>
              createrName
              <h2>{songTitle}</h2>
            </div>
            <div className={cx(`${moduleName}-top-musicCard-player`)}>
              플레이어
              <button onClick={this.props.playPrevSong}>{'<'}</button>
              <button onClick={this.togglePlay}>{'toggle'}</button>
              <button onClick={this.props.playNexSong}>{'>'}</button>
            </div>
          </div>
          <div className={cx(`${moduleName}-top-musicController`)}>
            <div className={cx(`${moduleName}-top-musicController-slider`)}>
              <div
                className={cx(`${moduleName}-top-musicController-slider-left`)}
              >
                {formatSeconds(currentTime)}
              </div>
              <div
                className={cx(
                  `${moduleName}-top-musicController-slider-center`
                )}
              >
                <Slider
                  max={songDuration}
                  onChange={this.props.changeMyPlayerCurrentTime}
                  value={currentTime}
                />
              </div>
              <div
                className={cx(`${moduleName}-top-musicController-slider-right`)}
              >
                {formatSeconds(songDuration)}
              </div>
            </div>
            <div
              className={cx(`${moduleName}-top-musicController-soundWrapper`)}
            >
              <div className={cx(`${moduleName}-top-musicController-sound`)}>
                <Slider max={1} value={volume} />
              </div>
            </div>
          </div>
        </div>
        <div className={cx(`${moduleName}-bottom`)}>
          <div className={cx(`${moduleName}-bottom-song`)}>음악이야1</div>
          <div className={cx(`${moduleName}-bottom-song`)}>음악이야2</div>
          <div className={cx(`${moduleName}-bottom-song`)}>음악이야3</div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => {
    const { meta, player, music } = state
    return {
      showMyplayer: meta.showMyplayer,
      player,
      song: music.song
    }
  },
  {
    toggleMyplayer,
    changeMyPlayerCurrentTime,
    onPlay,
    onPause,
    playNexSong,
    playPrevSong
  }
)(MyPlayer)
