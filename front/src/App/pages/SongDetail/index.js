import React, { Component } from 'react'

import classnames from 'classnames/bind'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = "SongDetail"

class SongDetail extends Component {
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-music`)}>album</div>
        <div className={cx(`${moduleName}-infoWrapper`)}>
          <div className={cx(`${moduleName}-songInfo`)}>앨범소개</div>
          <div className={cx(`${moduleName}-coments`)}>댓글</div>
        </div>
      </div>
    )
  }
}

export default SongDetail