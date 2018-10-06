import React, { Component } from 'react'
import classnames from 'classnames/bind'

import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'MyPlayer'

class MyPlayer extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        {/* <h1>안녕 나는 마이플레이어야 </h1> */}
      </div>
    )
  }
}

export default MyPlayer
