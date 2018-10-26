import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

import { toggleMyplayer } from 'src/redux/meta/actions.js'
import { onPlay, onPause } from 'src/redux/player/actions'

import css from './index.scss'
import { isRegExp } from 'util'

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

  render() {
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
              title createrName
            </div>
            <div className={cx(`${moduleName}-top-musicCard-player`)}>
              플레이어
              <button>{'<'}</button>
              <button
                onClick={() => {
                  if (this.props.player.isPlaying) {
                    this.props.onPause()
                  } else {
                    this.props.onPlay()
                  }
                }}
              >
                {'toggle'}
              </button>
              <button>{'>'}</button>
            </div>
          </div>
          <div className={cx(`${moduleName}-top-musicController`)}>
            음악컨트롤러
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
    const { meta, player } = state
    return {
      showMyplayer: meta.showMyplayer,
      player
    }
  },
  {
    toggleMyplayer,
    onPlay,
    onPause
  }
)(MyPlayer)
