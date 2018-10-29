import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import classnames from "classnames/bind"

import css from "./FeaturedComponent.scss"

const cx = classnames.bind(css)
const moduleName = "FeaturedComponent"

class FeaturedComponent extends PureComponent {
  static propTypes = {
    kind: PropTypes.string,
    icon: PropTypes.string
  }
  static defaultProps = {
    kind: "feature",
    icon: ""
  }
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div
          className={cx(`${moduleName}-mid`)}
          style={{ background: this.props.icon }}
        />
        <div className={cx(`${moduleName}-bot`)}>{this.props.kind}</div>
      </div>
    )
  }
}

export default FeaturedComponent
