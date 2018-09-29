import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import classnames from 'classnames/bind'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'SongDetail'

class SongDetail extends Component {
  render() {
    const { songDetail } = this.props
    // debugger
    if (!songDetail) return <h1 style={{ color: 'white' }}>Loading</h1>
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-music`)}>
          <img
            className={cx(`${moduleName}-albumCover`)}
            alt="albumCover"
            src={songDetail.artwork_url.replace('large', 'crop')}
          />
          <div className={cx(`${moduleName}-wordings`)}>
            wordings
            {songDetail.user.username}
          </div>
        </div>
        <div className={cx(`${moduleName}-infoWrapper`)}>
          <div className={cx(`${moduleName}-songInfo`)}>앨범소개</div>
          <div className={cx(`${moduleName}-coments`)}>댓글</div>
        </div>
      </div>
    )
  }
}

export default compose(
  connect((state, props) => {
    const { music } = state
    return {
      songDetail: music.songDetail
    }
  })
)(SongDetail)
