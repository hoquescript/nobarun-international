import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TextareaProps {
  label: string;
  name: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  iconAdornment?: React.ReactNode;
}
const Textarea = (props: TextareaProps) => {
  const { label, name, className, placeholder, required, iconAdornment } =
    props;
  const { register } = useFormContext();

  return (
    <div
      className={`field ${className}`}
      style={{ position: iconAdornment ? 'relative' : 'static' }}
    >
      <label>
        {label} {required && <sup style={{ color: 'red' }}>*</sup>}
      </label>
      {iconAdornment}
      <textarea
        className={`custom-input ${iconAdornment ? ' video__input' : ''}`}
        placeholder={placeholder}
        {...register(name, {
          required: {
            value: required as boolean,
            message: `Please fill the value of ${label} field`,
          },
        })}
      ></textarea>
    </div>
  );
};
Textarea.defaultProps = {
  placeholder: '',
};

export default Textarea;
