import React, { PureComponent } from "react"

import PropTypes from "prop-types"
import classnames from "classnames/bind"
import css from "./FeaturedComponent.scss"

const cx = classnames.bind(css)
const moduleName = "FeaturedComponent"
// TODO : PureComponent with shouldComponentUpdate
class FeaturedComponent extends PureComponent {
  static propTypes = {
    kind: PropTypes.string,
    icon: PropTypes.string,
    width: PropTypes.string,
    popUp: PropTypes.func
  }
  static defaultProps = {
    kind: "feature",
    icon: "",
    width: "0px"
  }

  render() {
    return (
      <div className={cx(`${moduleName}`)} onClick={this.props.popUp}>
        <div className={cx(`${moduleName}-float`)} />
        <div
          className={cx(`${moduleName}-mid`)}
          style={{ background: this.props.icon, width: this.props.width }}
        />
        <div className={cx(`${moduleName}-bot`)}>{this.props.kind}</div>
      </div>
    )
  }
}

export default FeaturedComponent
