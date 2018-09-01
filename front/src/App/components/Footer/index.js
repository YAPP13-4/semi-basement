import React, { Component } from 'react'

import classnames from 'classnames/bind'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Footer'

class Footer extends Component {
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-player`)}>플레이어야</div>
      </div>
    )
  }
}

export default Footer
