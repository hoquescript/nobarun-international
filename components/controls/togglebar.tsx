import React from 'react';

interface TogglebarProps {
  children?: React.ReactNode;
  checked?: boolean;
}
const Togglebar = (props: TogglebarProps) => {
  const { children, checked } = props;
  return (
    <label htmlFor="publish" className="custom-switch">
      <input type="checkbox" id="publish" checked={checked} />
      <span>{children}</span>
    </label>
  );
};

export default Togglebar;
