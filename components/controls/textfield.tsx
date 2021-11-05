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
  } = props;
  const { register } = useFormContext();

  const { onChange, ...state } = register(name, {
    required: {
      value: required as boolean,
      message: `Please fill the value of ${label} field`,
    },
  });

  return (
    <div className={`field ${className}`}>
      <label>
        {label} {required && <sup style={{ color: 'red' }}>*</sup>}
      </label>
      {onChangeHandler ? (
        <input
          type={type}
          className="custom-input"
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
          className="custom-input"
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
