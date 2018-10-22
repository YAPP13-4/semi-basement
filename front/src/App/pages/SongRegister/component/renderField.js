import React from "react"
export const renderInputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input
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

export const renderAreaField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
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
