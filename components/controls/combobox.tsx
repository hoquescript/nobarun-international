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
  const { name, label, options, placeholder } = props;
  const { register } = useFormContext();

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>

      <select className="custom-input" id={name} {...register(name)}>
        <option disabled selected value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Combobox;
