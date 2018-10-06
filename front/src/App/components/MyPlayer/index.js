import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

import { toggleMyplayer } from 'src/redux/meta/actions.js'

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
    const { meta } = state
    return {
      showMyplayer: meta.showMyplayer
    }
  },
  {
    toggleMyplayer
  }
)(MyPlayer)
