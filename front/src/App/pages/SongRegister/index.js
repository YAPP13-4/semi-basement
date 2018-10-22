import React, { PureComponent } from "react"
import classnames from "classnames/bind"
import css from "./index.scss"
import test1 from "src/assets/test_reg/jmb.png"
import test2 from "src/assets/test_reg/pika.png"
import TextInputForm from "./component/textInput"
import RightSideForm from "./component/RightSideForm"
const cx = classnames.bind(css)
const moduleName = "SongRegist"
class SongRegist extends PureComponent {
  state = {
    selectedArtWork: `url(${test1})`
  }
  selectThumbnail = number => {
    switch (number) {
      case 1:
        this.setState(() => {
          return {
            selectedArtWork: `url(${test1})`
          }
        })
        break
      case 2:
        this.setState(() => {
          return {
            selectedArtWork: `url(${test2})`
          }
        })
        break
      default:
        break
    }
  }

  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}_top`)}>
          <h4>Register Song</h4>
        </div>
        <form>
          <div className={cx(`${moduleName}_body`)}>
            <div className={cx(`${moduleName}_left`)}>
              <TextInputForm thumbnail={this.state.selectedArtWork} />
            </div>
            <div className={cx(`${moduleName}_right`)}>
              <div className={cx(`${moduleName}_right_top`)}>Album cover </div>
              <div
                className={cx(`${moduleName}_right_mid`)}
                style={{ backgroundImage: this.state.selectedArtWork }}
              />
              <RightSideForm selectThumbnail={this.selectThumbnail} />
              <div className={cx(`${moduleName}_right_bot_submit`)}>
                <button className="btn">Cancel</button>
                <button className="btn">Register</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default SongRegist
