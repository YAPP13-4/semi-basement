import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'
import axios from 'axios'

import { toggleMyplayer } from 'src/redux/meta/actions.js'
import {
  onPlay,
  onPause,
  playNexSong,
  playPrevSong,
  changeMyPlayerCurrentTime,
  changeMyPlayerVolume
} from 'src/redux/player/actions'
import Slider from 'src/App/components/Slider/'
import { formatSeconds } from 'src/utils/NumberUtils'
import { SONG_URL } from 'src/App/constants/ApiConstants'
import getImageUrl from 'src/utils/ImageUtils'
import IMAGE_SIZES from 'src/App/constants/ImageConstants'

import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'MyPlayer'

class MyPlayer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      musicListInfos: []
    }
  }

  componentDidMount() {
    this.getMusicListInfos(this.props.musicList)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.musicList !== this.props.musicList) {
      this.getMusicListInfos(this.props.musicList)
    }
  }

  handleClose = () => {
    this.props.toggleMyplayer()
  }

  togglePlay = () => {
    const { player, onPause, onPlay } = this.props
    player.isPlaying ? onPause() : onPlay()
  }

  getMusicListInfos = musicList => {
    if (!musicList) return
    axios
      .all(musicList.map(musicId => this.getMusicInfo(musicId)))
      .then(res => this.setState({ musicListInfos: res }))
  }

  getMusicInfo = musicId => {
    return axios
      .get(SONG_URL.replace(':id', musicId))
      .then(
        ({
          data: {
            artwork_url,
            title,
            duration,
            user: { username }
          }
        }) => {
          return {
            artworkUrl: artwork_url,
            title,
            username,
            duration: duration / 1000
          }
        }
      )
  }

  renderPlayList = () => {
    if (!this.state.musicListInfos.length) return <div />
    return this.state.musicListInfos.map((info, index) => {
      return (
        <div className={cx(`${moduleName}-bottom-song`)} key={index}>
          <i className={cx(`${moduleName}-bottom-song-move`)} />
          <div
            className={cx(`${moduleName}-bottom-song-artwork`)}
            style={{
              backgroundImage: `url(${getImageUrl(
                info.artworkUrl,
                IMAGE_SIZES.SMALL
              )})`
            }}
          />
          <div className={cx(`${moduleName}-bottom-song-center`)}>
            <p className={cx(`${moduleName}-bottom-song-center-top`)}>
              {info.title}
            </p>
            <p className={cx(`${moduleName}-bottom-song-center-bottom`)}>
              {info.username}
            </p>
          </div>
          <p className={cx(`${moduleName}-bottom-song-duration`)}>
            {formatSeconds(info.duration)}
          </p>
          <div className={cx(`${moduleName}-bottom-song-etc`)}>
            <i />
          </div>
        </div>
      )
    })
  }

  render() {
    const [songId, songTitle, songUrl, songDuration] = this.props.song
    const { currentTime } = this.props.player
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
                <Slider
                  max={1}
                  onChange={this.props.changeMyPlayerVolume}
                  value={this.props.player.myPlayerVolume}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={cx(`${moduleName}-bottom`)}>
          <div className={cx(`${moduleName}-bottom-playlist`)}>
            <div className={cx(`${moduleName}-bottom-playlist-shuffle`)}>
              <i />
            </div>
            <h3 className={cx(`${moduleName}-bottom-playlist-mainTitle`)}>
              {this.props.currentList}
            </h3>
            <h4 className={cx(`${moduleName}-bottom-playlist-toggleTitle`)}>
              My PlayList
              <i/>
            </h4>
          </div>
          {this.renderPlayList()}
        </div>
      </div>
    )
  }
}

export default connect(
  state => {
    const { meta, player, music, playList } = state
    return {
      showMyplayer: meta.showMyplayer,
      player,
      song: music.song,
      currentList: playList.currentList,
      musicList: playList.musicList
    }
  },
  {
    toggleMyplayer,
    changeMyPlayerCurrentTime,
    changeMyPlayerVolume,
    onPlay,
    onPause,
    playNexSong,
    playPrevSong
  }
)(MyPlayer)
