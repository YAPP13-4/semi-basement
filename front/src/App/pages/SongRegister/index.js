import React, { Component } from "react"
import classnames from "classnames/bind"
import css from "./index.scss"
import test1 from "src/assets/test_reg/jmb.png"
import test2 from "src/assets/test_reg/pika.png"
import TextInputForm from "./component/textInput"

const cx = classnames.bind(css)
const moduleName = "SongRegist"
//image selection은 input type hidden 의 value를 조정해서 submit하기.
class SongRegist extends Component {
  state = {
    selectedArtWork: `url(${test1})`,
    title: null
  }
  selectThumbnail = number => {
    //나중에 reducer로 번호만 넘겨서 뒷단에서 thumbnail 매칭하기.
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
        <div className={cx(`${moduleName}_body`)}>
          <div className={cx(`${moduleName}_left`)}>
            <TextInputForm />
          </div>
          <div className={cx(`${moduleName}_right`)}>
            <div className={cx(`${moduleName}_right_top`)}>Album cover </div>
            <div
              className={cx(`${moduleName}_right_mid`)}
              style={{ backgroundImage: this.state.selectedArtWork }}
            />
            <input
              type="hidden"
              name="thumbnail"
              value={this.state.selectedArtWork}
            />
            <div className={cx(`${moduleName}_right_bot`)}>
              <div className={cx(`${moduleName}_right_bot_wrapper`)}>
                <div
                  onClick={() => {
                    this.selectThumbnail(1)
                  }}
                >
                  1
                </div>
                <div
                  onClick={() => {
                    this.selectThumbnail(2)
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
            <div className={cx(`${moduleName}_right_bot_check`)}>
              <label htmlFor="user_terms" className="checkbox-inline">
                <input
                  id="user_terms"
                  type="checkbox"
                  className="checkbox-inline"
                />
                I agree use this album cover.
              </label>
            </div>
            <div className={cx(`${moduleName}_right_bot_submit`)}>
              <button className="btn">Cancel</button>
              <button className="btn">Register</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default SongRegist
//export default SongRegist
