import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { formatDdMonthYyyy } from 'src/utils/DateUtils'

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
            <h3>{songDetail.user.username}</h3>
            <h2>{songDetail.title}</h2>
          </div>
        </div>
        <div className={cx(`${moduleName}-infoWrapper`)}>
          <div className={cx(`${moduleName}-songInfo`)}>
            앨범소개
            <div>
              <img
                // className={cx(`${moduleName}`)}
                alt="artistProfile"
                src={songDetail.user.avatar_url.replace('large', 'crop')}
              />
              Released date
              <p>{formatDdMonthYyyy(songDetail.created_at)}</p>
              <h3>{songDetail.user.username}</h3>
            </div>
            <div>
              <h1>Description</h1>
              <p>{songDetail.description}</p>
            </div>
          </div>
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
