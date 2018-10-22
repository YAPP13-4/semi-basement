import React, { PureComponent } from "react"
import { Field, reduxForm } from "redux-form"
import { renderInputField, renderAreaField } from "./renderField"
class TextInputForm extends PureComponent {
  render() {
    return (
      <div>
        <form>
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
        </form>
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
    errors.Upload = "Required"
  }
  return errors
}
export default reduxForm({
  form: "RegisterMusic",
  validate
})(TextInputForm)
