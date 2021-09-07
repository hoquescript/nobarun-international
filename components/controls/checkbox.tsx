import React from 'react';

interface CheckboxProps {
  children: React.ReactNode;
}
const Checkbox = (props: CheckboxProps) => {
  const { children } = props;
  return (
    <div className="fields">
      <div className="field field__term">
        <label className="custom-checkbox mb-30" htmlFor="terms-conditions">
          <input type="checkbox" id="terms-conditions" />
          <div className="content">{children}</div>
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
