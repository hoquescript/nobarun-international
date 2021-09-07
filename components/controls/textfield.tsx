import React from 'react';

interface TextfieldProps {
  label: string;
  className?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'tel' | 'email' | 'password' | 'file';
  required?: boolean;
}
const Textfield = (props: TextfieldProps) => {
  const { type, label, placeholder, required, className } = props;
  return (
    <div className={`field ${className}`}>
      <label>
        {label} {required && <sup style={{ color: 'red' }}>*</sup>}
      </label>
      <input type={type} className="custom-input" placeholder={placeholder} />
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
