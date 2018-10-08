import PropTypes from "prop-types"
import React, { PureComponent } from "react"
import classnames from "classnames/bind"
import css from "./slider.scss"
import offsetLeft from "../../utils/DomUtils"
const cx = classnames.bind(css)
const moduleName = "Slider"

const prevent = e => {
  e.preventDefault()
  e.stopPropagation()
}

class Slider extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired
  }
  static defaultProps = {
    className: ""
  }
  constructor() {
    super()
    this.onClick = this.onClick.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.domNode = null
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.onMouseMove)
    document.removeEventListener("mouseup", this.onMouseUp)
  }

  onClick(e) {
    const { max, onChange } = this.props

    const percent =
      (e.clientX - offsetLeft(e.currentTarget)) / e.currentTarget.offsetWidth
    console.log("percent*max", percent * max)
    onChange(percent * max)
  }

  onMouseDown() {
    document.addEventListener("mousemove", this.onMouseMove)
    document.addEventListener("mouseup", this.onMouseUp)
  }

  onMouseMove(e) {
    const { domNode, props } = this
    const { max, onChange } = props

    const diff = e.clientX - offsetLeft(domNode)
    const percent = Math.min(Math.max(diff / domNode.offsetWidth, 0), 1)
    onChange(percent * max)
  }

  onMouseUp() {
    document.removeEventListener("mousemove", this.onMouseMove)
    document.removeEventListener("mouseup", this.onMouseUp)
  }

  render() {
    const { className, max, value } = this.props
    const width = `${(value / max) * 100}%`

    return (
      <div className={cx(`${moduleName}`)}>
        <div
          className={`slider ${className}`}
          onClick={this.onClick}
          ref={node => {
            this.domNode = node
          }}
          role="button"
          tabIndex="0"
        >
          <div className={cx(`${moduleName}__bar`)}>
            {max > 0 ? (
              <div className={cx(`${moduleName}__bar__fill`)} style={{ width }}>
                <div
                  className={cx(`${moduleName}__handle`)}
                  onClick={prevent}
                  onMouseDown={this.onMouseDown}
                  role="button"
                  tabIndex="0"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Slider
