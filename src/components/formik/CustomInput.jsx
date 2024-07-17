/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';

const CustomInput = ({
  field, form: { touched, errors }, label, inputRef, type, ...props
}) => (
  <div className="input-group">
    {label && (
      <label className="label-input" htmlFor={field.name}>
        {label}
      </label>
    )}
    <input
      type={type}
      id={field.name}
      className={`input-form ${touched[field.name] && errors[field.name] && 'input-error'}`}
      ref={inputRef}
      {...field}
      {...props}
    />
    {touched[field.name] && errors[field.name] && (
      <div className="error">{errors[field.name]}</div>
    )}
  </div>
);

CustomInput.defaultProps = {
  inputRef: undefined,
  type: 'text'
};

CustomInput.propTypes = {
  label: PropTypes.string,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  type: PropTypes.string
};

export default CustomInput;
