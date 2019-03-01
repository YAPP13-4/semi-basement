import React from 'react';


const TextField = ({type, id, title, value, placeholder, onChange, onBlur}) => {

  const handleKeyDown = e => {
    if (e.key === 'Enter') e.preventDefault()
  }

  return (
    <div>
      <label htmlFor={id}>{title}</label>
      {type === 'input' &&
        <input
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
        />}
      {type === 'textarea' &&
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
        />}
    </div>
  )
};

export default TextField;