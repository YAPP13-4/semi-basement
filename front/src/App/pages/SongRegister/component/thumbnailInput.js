import React, { PureComponent } from "react"
import classnames from "classnames/bind"
import css from "./thumbnailInput.scss"

const cx = classnames.bind(css)
const moduleName = "ThumbNailInput"
class ThumbNailInput extends PureComponent {
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}_wrapper`)}>
          <div
            onClick={() => {
              this.props.selectThumbnail(1)
            }}
          >
            1
          </div>
          <div
            onClick={() => {
              this.props.selectThumbnail(2)
            }}
          >
            2
          </div>
          <div>3 </div>
          <div>4 </div>
          <div>5 </div>
          <div>6 </div>
        </div>
      </div>
    )
  }
}
export default ThumbNailInput
