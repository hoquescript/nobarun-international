import React from 'react';

interface TextfieldProps {
  label: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'tel' | 'email' | 'password';
  required?: boolean;
}
const Textfield = (props: TextfieldProps) => {
  const { type, label, placeholder, required } = props;
  return (
    <div className="field">
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
};

export default Textfield;
