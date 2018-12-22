import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import classnames from "classnames/bind"
import css from "./NavBar.scss"

const cx = classnames.bind(css)
const moduleName = "NavBar"
export default class NavBar extends PureComponent {
  static propTypes = {
    handleExposedResultChange: PropTypes.func,
    selectedResult: PropTypes.string
  }
  static defaultProps = {
    selectedResult: "All"
  }

  render() {
    const paintingSelectedStyle = menu => {
      if (this.props.selectedResult === `${menu}`) return selectedStyle
    }
    const selectedStyle = {
      color: "#ffffff"
    }
    return (
      <div className={cx(`${moduleName}`)}>
        {/*일시적 처리. 나중에 좀더 깔끔히! */}
        <div
          onClick={() => {
            this.props.handleExposedResultChange("All")
          }}
          style={paintingSelectedStyle("All")}
        >
          All
        </div>
        <div
          onClick={() => {
            this.props.handleExposedResultChange("user.username")
          }}
          style={paintingSelectedStyle("user.username")}
        >
          Artist
        </div>
        <div
          onClick={() => {
            this.props.handleExposedResultChange("title")
          }}
          style={paintingSelectedStyle("title")}
        >
          Title
        </div>
      </div>
    )
  }
}
