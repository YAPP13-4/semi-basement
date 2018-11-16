import React, { Component } from 'react'

import classnames from 'classnames/bind'

import css from './Tooltip.scss'

const cx = classnames.bind(css)
const moduleName = 'Tooltip'

class Tooltip extends Component {
  render() {
    const style = {
      zIndex: 1000,
      top: 50,
      left: -50,
      position: 'absolute'
    }

    return (
      <div className={cx(`${moduleName}`)}>
        <div>{this.props.children}</div>
        <div style={style} className={cx(`${moduleName}-tooltipWrapper`)}>
          툴팁이야.
        </div>
      </div>
    )
  }
}

export default Tooltip
