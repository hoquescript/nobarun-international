import React from 'react';

interface TextareaProps {
  label: string;
  placeholder?: string;
}
const Textarea = (props: TextareaProps) => {
  const { label, placeholder } = props;
  return (
    <div className="field">
      <label>{label}</label>
      <textarea className="custom-input" placeholder={placeholder}></textarea>
    </div>
  );
};
Textarea.defaultProps = {
  placeholder: '',
};

export default Textarea;
