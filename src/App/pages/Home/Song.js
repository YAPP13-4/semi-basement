import React from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames/bind'
import css from './song.scss'

const cx = classnames.bind(css)
const moduleName = 'Song'

function Song({ thumbnail, singer, title, mp3 }) {
  return (
    <div className={cx(`${moduleName}`)}>
      <div className={cx(`${moduleName}-thumbnail`)}>
        <img src={thumbnail} alt={'thumbnail'} />
      </div>
      <div className={cx(`${moduleName}-info`)}>
        <p>{title}</p>
        <p>{singer}</p>
      </div>
    </div>
  )
}

export default Song
