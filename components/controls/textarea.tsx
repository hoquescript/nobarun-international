import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TextareaProps {
  label: string;
  name: string;
  placeholder?: string;
}
const Textarea = (props: TextareaProps) => {
  const { label, name, placeholder } = props;
  const { register } = useFormContext();

  return (
    <div className="field">
      <label>{label}</label>
      <textarea
        className="custom-input"
        placeholder={placeholder}
        {...register(name)}
      ></textarea>
    </div>
  );
};
Textarea.defaultProps = {
  placeholder: '',
};

export default Textarea;
