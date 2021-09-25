import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TogglebarProps {
  name: string;
  className?: string;
  required?: boolean;
  children?: React.ReactNode;
  checked?: boolean;
}
const Togglebar = (props: TogglebarProps) => {
  const { name, checked, required, className, children } = props;

  const { register } = useFormContext();

  return (
    <label htmlFor={name} className={`custom-switch ${className}`}>
      <input
        type="checkbox"
        id="publish"
        checked={checked}
        {...register(name, { required })}
      />
      <span>{children}</span>
    </label>
  );
};

export default Togglebar;
