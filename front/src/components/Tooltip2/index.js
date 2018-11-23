import React, { Component, Fragment } from 'react'

import classnames from 'classnames/bind'

import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Tooltip'

class Tooltip2 extends Component {
  constructor(props) {
    super(props)

    this.state = { opacity: false }
  }

  toggle = e => {
    this.setState({ opacity: !this.state.opacity })
    e.stopPropagation()
  }

  render() {
    const style = {
      opacity: +this.state.opacity,
      zIndex: this.state.opacity ? 1000 : -1000,
      top: 60,
      left: -210,
      position: 'absolute'
    }

    return (
      <Fragment>
        <div onClick={this.toggle}>{this.props.children}</div>
        <div style={style} className={cx(`${moduleName}-tooltipWrapper`)}>
          <div className={cx(`${moduleName}-arrow`)} />
          <div
            className={cx(`${moduleName}-innerFirst`)}
            onClick={e => {
              this.props.onClickAdd(e)
              this.toggle(e)
            }}
          >
            <div className={cx(`${moduleName}-innerFirst-addIcon`)} />
            <span>add</span>
          </div>
          <div
            className={cx(`${moduleName}-innerSecond`)}
            onClick={() => {
              alert('share!')
            }}
          >
            <div className={cx(`${moduleName}-innerSecond-shareIcon`)} />
            <span>share</span>
          </div>
          <div
            className={cx(`${moduleName}-innerThird`)}
            onClick={() => {
              alert('like!')
            }}
          >
            <div className={cx(`${moduleName}-innerThird-likeIcon`)} />
            <span>like</span>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Tooltip2
