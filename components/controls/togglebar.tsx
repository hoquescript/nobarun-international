import React from 'react';

interface TogglebarProps {
  children: React.ReactNode;
}
const Togglebar = (props: TogglebarProps) => {
  const { children } = props;
  return (
    <label htmlFor="publish" className="custom-switch">
      <input type="checkbox" id="publish" />
      {children}
    </label>
  );
};

export default Togglebar;
