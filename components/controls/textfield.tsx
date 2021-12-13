import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TextfieldProps {
  label: string;
  name: string;
  className?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'tel' | 'email' | 'password' | 'file' | 'date';
  required?: boolean;
  value?: string;
  onChangeHandler?: (value: any) => void;
  iconAdornment?: React.ReactNode;
}

const Textfield = (props: TextfieldProps) => {
  const {
    type,
    name,
    label,
    value,
    placeholder,
    required,
    className,
    onChangeHandler,
    iconAdornment,
  } = props;
  const { register } = useFormContext();

  const { onChange, ...state } = register(name, {
    required: {
      value: required as boolean,
      message: `Please fill the value of ${label} field`,
    },
  });
  return (
    <div
      className={`field ${className}`}
      style={{ position: iconAdornment ? 'relative' : 'static' }}
    >
      <label>
        {label} {required && <sup style={{ color: 'red' }}>*</sup>}
      </label>
      {iconAdornment}
      {onChangeHandler ? (
        <input
          type={type}
          className={`custom-input ${
            iconAdornment ? ' video__input mt-30' : ''
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            if (onChangeHandler) {
              onChangeHandler(e);
              onChange(e);
            }
          }}
          {...state}
        />
      ) : (
        <input
          type={type}
          className={`custom-input ${iconAdornment ? ' video__input' : ''}`}
          placeholder={placeholder}
          value={value}
          {...register(name, {
            required: {
              value: required as boolean,
              message: `Please fill the value of ${label} field`,
            },
          })}
        />
      )}
    </div>
  );
};

Textfield.defaultProps = {
  type: 'text',
  placeholder: '',
  required: false,
  className: '',
};

export default Textfield;
