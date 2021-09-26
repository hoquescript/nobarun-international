import React from 'react';
import { useFormContext } from 'react-hook-form';

interface CheckboxProps {
  name: string;
  className?: string;
  required?: boolean;
  children?: React.ReactNode;
  checked?: boolean;
}
const Checkbox = (props: CheckboxProps) => {
  const { name, checked, required, className, children } = props;

  const { register } = useFormContext();

  return (
    <div className="fields">
      <div className="field field__term">
        <label className="custom-checkbox mb-30" htmlFor="terms-conditions">
          <input
            type="checkbox"
            id="terms-conditions"
            checked={checked}
            {...register(name, { required })}
          />
          <div className="content">{children}</div>
        </label>
      </div>
    </div>
  );
};
Checkbox.defaultProps = {
  checked: false,
  required: false,
};
export default Checkbox;
