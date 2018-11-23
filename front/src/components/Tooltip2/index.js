import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames/bind'

import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Tooltip2'

class Tooltip2 extends Component {
  constructor(props) {
    super(props)

    this.state = { opacity: false }

    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setWrapperRef(node) {
    this.wrapperRef = node
  }

  handleClickOutside(e) {
    if (this.state.opacity && this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.setState({opacity:false})
    }
  }

  toggle = e => {
    this.setState({ opacity: !this.state.opacity })
    e.stopPropagation()
  }

  renderTooltipList = tooltipList => {
    return tooltipList.map(v => {
      return (
        <div className={cx(`${moduleName}-tooltipListItem`)} onClick={v.action}>
          <div
            style={v.icon ? {} : { width: '0px' }}
            className={cx(`${moduleName}-tooltipListItem-iconWrapper`)}
          >
            <div
              className={cx(`${moduleName}-tooltipListItem-icon`)}
              style={v.icon}
            />
          </div>
          <span
            style={v.icon ? {} : { paddingRight: '0px' }}
            className={cx(`${moduleName}-tooltipListItem-name`)}
          >
            {v.name}
          </span>
        </div>
      )
    })
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
      <div ref={this.setWrapperRef}>
        <div onClick={this.toggle}>{this.props.children}</div>
        <div style={style} className={cx(`${moduleName}-tooltipWrapper`)}>
          <div className={cx(`${moduleName}-arrow`)} />
          <div className={cx(`${moduleName}-tooltipItemsWrapper`)}>
            {this.renderTooltipList(this.props.tooltipList)}
          </div>
        </div>
      </div>
    )
  }
}

Tooltip2.propTypes = {
  children: PropTypes.element.isRequired
}

export default Tooltip2
