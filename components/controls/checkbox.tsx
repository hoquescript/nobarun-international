import React from 'react';
import { useFormContext } from 'react-hook-form';

interface CheckboxProps {
  name: string;
  className?: string;
  required?: boolean;
  children?: React.ReactNode;
  checked?: boolean;
  label?: string;
}
const Checkbox = (props: CheckboxProps) => {
  const { name, checked, required, label, children } = props;

  const { register } = useFormContext();

  return (
    <div className="fields">
      <div className="field field__term">
        <label className="custom-checkbox mb-30" htmlFor={name}>
          <input
            type="checkbox"
            id={name}
            // checked={checked}
            {...register(name, {
              required: {
                value: required as boolean,
                message: `Please fill the value of ${label} field`,
              },
            })}
          />
          <div className="content">{children}</div>
        </label>
      </div>
    </div>
  );
};
Checkbox.defaultProps = {
  // checked: false,
  label: 'Checkbox',
  required: false,
};
export default Checkbox;
