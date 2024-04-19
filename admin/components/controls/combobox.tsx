import React from 'react';
import { useFormContext } from 'react-hook-form';

interface ComboboxProps {
  label: string;
  name: string;
  className?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'tel' | 'email' | 'password' | 'file';
  options: { id: string; value: string }[];
  required?: boolean;
}

const Combobox = (props: ComboboxProps) => {
  const { name, label, options, placeholder, required } = props;
  const { register } = useFormContext();

  return (
    <div className="field">
      <label htmlFor={name}>
        {label} {required && <sup style={{ color: 'red' }}>*</sup>}
      </label>
      <select
        className="custom-input"
        id={name}
        {...register(name, {
          required: {
            value: required as boolean,
            message: `Please fill the value of ${label} field`,
          },
        })}
      >
        {required ? (
          <option disabled selected value="">
            {placeholder}
          </option>
        ) : (
          <option value="">{placeholder}</option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

Combobox.defaultProps = {
  required: false,
};

export default Combobox;
