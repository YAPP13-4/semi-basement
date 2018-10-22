import React from "react"
export const renderInputField = ({
  input,
  label,
  type,
  hintText,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    {touched &&
      ((error && (
        //FIXME : SASS 문법 ..때문에 inline style 행..
        <span className="error" style={{ color: "#ff0000" }}>
          {error}
        </span>
      )) ||
        (warning && <span>{warning}</span>) || (
          <span className="done" style={{ color: "#45f7aa" }}>
            Done
          </span>
        ))}
    <div>
      <input
        {...input}
        placeholder={hintText ? hintText : label}
        type={type}
        className="form-control"
      />
    </div>
  </div>
)

export const renderAreaField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <span>Option</span>
    <div>
      <textarea
        {...input}
        placeholder={label}
        type={type}
        className="form-control"
        value={input.value}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export const renderCheckBoxField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <div style={{ display: "flex" }}>
      <input
        {...input}
        type={type}
        className="form-control"
        value={input.value}
        id={label}
      />
      <label htmlFor={label}>{label}</label>
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)
