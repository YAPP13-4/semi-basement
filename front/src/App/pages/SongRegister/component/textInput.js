import React, { PureComponent } from "react"
import { Field, reduxForm } from "redux-form"
import { regexUrl } from "../../../constants/ApiConstants"
import { renderInputField, renderAreaField } from "./renderField"
class TextInputForm extends PureComponent {
  render() {
    return (
      <div>
        <div className="form-group">
          <Field
            type="text"
            name="title"
            label="Title"
            component={renderInputField}
          />
        </div>
        <div className="form-group">
          <Field
            type="text"
            name="Feat"
            label="Feat"
            component={renderInputField}
          />
        </div>
        <div className="form-group">
          <Field
            type="text"
            name="Upload"
            label="Upload"
            component={renderInputField}
            hintText="https://"
          />
        </div>
        <div className="form-group">
          <Field
            type="text"
            name="Lyrics"
            label="Lyrics"
            component={renderAreaField}
          />
        </div>
        <div className="form-group">
          <Field
            type="text"
            name="Description"
            label="Description"
            component={renderAreaField}
          />
        </div>
        <div className="form-group">
          <Field
            type="text"
            name="Email"
            label="Email"
            component={renderInputField}
          />
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
  if (!values.Feat) {
    errors.Feat = "Required"
  }
  if (!values.Upload) {
    errors.Upload = "Required"
  } else if (!isUrlValid(values.Upload)) {
    errors.Upload = "Invalid Url"
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
    errors.Email = "Invalid Email"
  }
  return errors
}
const isUrlValid = userInput => {
  var res = userInput.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  )
  if (res == null) return false
  else return true
}
export default reduxForm({
  form: "RegisterMusic",
  validate
})(TextInputForm)
