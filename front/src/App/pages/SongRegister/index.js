import React, { Component } from "react"
import { reduxForm } from "redux-form"
import classnames from "classnames/bind"
import css from "./index.scss"
import test1 from "src/assets/test_reg/jmb.png"
import test2 from "src/assets/test_reg/pika.png"

const cx = classnames.bind(css)
const moduleName = "SongRegist"
//image selection은 input type hidden 의 value를 조정해서 submit하기.
class SongRegist extends Component {
  state = {
    selectedArtWork: `url(${test1})`
  }
  render() {
    const {
      fields: { title, Feat, Upload, Lyrics, Desc, Email },
      handleSubmit
    } = this.props
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}_top`)}>
          <h4>Register Song</h4>
        </div>
        <div className={cx(`${moduleName}_body`)}>
          <div className={cx(`${moduleName}_left`)}>
            <form>
              <div className="form-group">
                <label>Title</label>
                <div className="text-help" />
                <input
                  type="text"
                  className={cx(`${moduleName}_form form-control`)}
                />
              </div>
              <div className="form-group">
                <label>Feat</label>
                <div className="text-help" />
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Upload</label>
                <div className="text-help" />
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Lyrics</label>
                <div className="text-help" />
                <textarea className="form-control" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <div className="text-help" />
                <textarea type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <div className="text-help" />
                <input type="text" className="form-control" />
              </div>
            </form>
          </div>
          <div className={cx(`${moduleName}_right`)}>
            <div className={cx(`${moduleName}_right_top`)}>Album cover </div>
            <div
              className={cx(`${moduleName}_right_mid`)}
              style={{ backgroundImage: "none" }}
            />
            <div className={cx(`${moduleName}_right_bot`)}>
              <div className={cx(`${moduleName}_right_bot_wrapper`)}>
                <div>1 </div>
                <div>2 </div>
                <div>3 </div>
                <div>4 </div>
                <div>5 </div>
                <div>6 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function validate(values) {
  const errors = {}
  if (!values.title) {
    errors.title = "Required"
  }

  if (!values.Upload) {
    errors.content = "Required"
  }
  return errors
}
export default reduxForm(
  {
    form: "RegisterMusic",
    fields: ["title", "Feat", "Upload", "Lyrics", "Desc", "Email"],
    validate
  },
  null
)(SongRegist)
//export default SongRegist
