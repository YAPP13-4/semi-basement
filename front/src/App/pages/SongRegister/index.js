import React, { PureComponent } from "react"
import classnames from "classnames/bind"
import { reduxForm } from "redux-form"
import css from "./index.scss"
///TEST
import test1 from "src/assets/test_reg/jmb.png"
import test2 from "src/assets/test_reg/pika.png"
import test3 from "src/assets/test_reg/Stone.png"
import test4 from "src/assets/test_reg/Stone2.png"
import test5 from "src/assets/test_reg/Stone3.png"
///
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
      case 3:
        this.setState(() => {
          return {
            selectedArtWork: `url(${test3})`
          }
        })
        break
      case 4:
        this.setState(() => {
          return {
            selectedArtWork: `url(${test4})`
          }
        })
        break
      case 5:
        this.setState(() => {
          return {
            selectedArtWork: `url(${test5})`
          }
        })
        break
      default:
        break
    }
  }
  submitTest = values => {
    console.log("submit!", this.props.form)
    console.log("submit values", values)
    //console.log("submit!")
  }
  render() {
    const { handleSubmit } = this.props
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}_top`)}>
          <h4>Register Song</h4>
        </div>
        <form onSubmit={handleSubmit(this.submitTest)}>
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
                <button type="submit" className="btn">
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default reduxForm({
  form: "RegisterMusic"
})(SongRegist)

//export default SongRegist