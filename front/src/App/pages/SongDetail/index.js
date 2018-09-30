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
        <div
          style={{
            backgroundImage: `url(${songDetail.artwork_url.replace(
              'large',
              'crop'
            )})`
          }}
          className={cx(`${moduleName}-music`)}
        >
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
            <div className={cx(`${moduleName}-songInfo-profile`)}>
              <img
                alt="artistProfile"
                src={songDetail.user.avatar_url.replace('large', 'crop')}
              />
              <div>
                <p>Released date</p>
                <h4>{formatDdMonthYyyy(songDetail.created_at)}</h4>
                <h3>{songDetail.user.username}</h3>
              </div>
            </div>
            <div className={cx(`${moduleName}-songInfo-description`)}>
              <h4>Description</h4>
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
