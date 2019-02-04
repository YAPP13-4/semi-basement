import React, {PureComponent} from 'react';
import {Field, reduxForm} from 'redux-form';
import { getMusicInfo } from 'src/api'
import {renderInputField, renderAreaField} from './renderField';
class TextInputForm extends PureComponent {
  
  componentDidMount() {
    this.getMusicInfo1()
  }
  
  getMusicInfo1 = () => {
    getMusicInfo('https://soundcloud.com/cshanryang/dbqo?in=cshanryang/sets/chosvn').then(res => {console.log(res)})
  }
  
  render() {
    return (
      <div>
        <div className="form-group">
          <Field
            type="text"
            name="url"
            label="URL"
            component={renderInputField}
            hintText="https://"
            onBlur={() => {
              this.getMusicInfo(this.props.url)
            }}
          />
        </div>
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
            name="Musician"
            label="Musician"
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
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.Feat) {
    errors.Feat = 'Required';
  }
  if (!values.Upload) {
    errors.Upload = 'Required';
  } else if (!isUrlValid(values.Upload)) {
    errors.Upload = 'Invalid Url';
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
    errors.Email = 'Invalid Email';
  }
  return errors;
}
const isUrlValid = userInput => {
  var res = userInput.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
  );
  if (res == null) return false;
  else return true;
};

export default reduxForm({
  form: 'RegisterMusic',
  validate,
  asyncBlurFields: ['url']
})(TextInputForm);
