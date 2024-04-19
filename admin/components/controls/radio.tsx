import React from 'react';

interface RadioProps {
  children: React.ReactNode;
}
const Radio = (props: RadioProps) => {
  const { children } = props;
  return (
    <>
      <label className="custom-radio" htmlFor="standard">
        <input type="radio" id="standard" name="shipping-option" />
        {children}
      </label>
    </>
  );
};

export default Radio;
