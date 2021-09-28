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
}

const Textfield = (props: TextfieldProps) => {
  const { type, name, label, value, placeholder, required, className } = props;
  const { register } = useFormContext();
  return (
    <div className={`field ${className}`}>
      <label>
        {label} {required && <sup style={{ color: 'red' }}>*</sup>}
      </label>
      <input
        type={type}
        className="custom-input"
        placeholder={placeholder}
        value={value}
        {...register(name, { required })}
      />
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
