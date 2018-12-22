import React, { Fragment, PureComponent } from "react"
import { Field, reduxForm } from "redux-form"
import { renderCheckBoxField } from "./renderField"
import classnames from "classnames/bind"
import css from "./RightSideForm.scss"
const cx = classnames.bind(css)
const moduleName = "RightSideForm"
class RightSideForm extends PureComponent {
  render() {
    return (
      <Fragment>
        <div className={cx(`${moduleName}`)}>
          <div className={cx(`${moduleName}_wrapper`)}>
            <div
              onClick={() => {
                this.props.selectThumbnail(1)
                this.props.change("thumbnail", 1) //redux-form 에 넘겨주는 값을 thumbnail : 1로 하기 위해.
              }}
            />
            <div
              onClick={() => {
                this.props.selectThumbnail(2)
                this.props.change("thumbnail", 2)
              }}
            />
            <div
              onClick={() => {
                this.props.selectThumbnail(3)
                this.props.change("thumbnail", 3)
              }}
            />
            <div
              onClick={() => {
                this.props.selectThumbnail(4)
                this.props.change("thumbnail", 4)
              }}
            />
            <div
              onClick={() => {
                this.props.selectThumbnail(5)
                this.props.change("thumbnail", 5)
              }}
            />
          </div>
        </div>
        <div className={cx(`${moduleName}_right_bot_check`)}>
          <Field
            label="I agree use this album cover."
            name="user_terms"
            id="user_terms"
            component={renderCheckBoxField}
            type="checkbox"
            className="checkbox-inline"
          />
        </div>
      </Fragment>
    )
  }
}
export default reduxForm({
  form: "RegisterMusic"
})(RightSideForm)

//export default ThumbNailInput
