import React from 'react';
import { useFormContext } from 'react-hook-form';

type optionType = { [optionName: string]: string };

interface ComboboxProps {
  label: string;
  name: string;
  className?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'tel' | 'email' | 'password' | 'file';
  options: string[] | optionType;
  required?: boolean;
}

const objectify = (arr: string[]) => {
  const result: optionType = {};
  arr.forEach((optionName) => {
    result[optionName] = optionName.toLowerCase().replace(/ /g, '');
  });
  return result;
};

const Combobox = (props: ComboboxProps) => {
  const { name, label, options, placeholder } = props;
  const { register } = useFormContext();

  const data: optionType = Array.isArray(options)
    ? objectify(options)
    : options;
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>

      <select className="custom-input" id={name} {...register(name)}>
        <option disabled selected value="">
          {placeholder}
        </option>
        {Object.keys(data).map((option) => (
          <option key={option} value={data[option]}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Combobox;
