import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}
const Textarea = (props: TextareaProps) => {
  const { label, name, placeholder, required } = props;
  const { register } = useFormContext();

  return (
    <div className="field">
      <label>
        {label} {required && <sup style={{ color: 'red' }}>*</sup>}
      </label>
      <textarea
        className="custom-input"
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
