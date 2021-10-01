import React from 'react';
import { useWatch, useFormState } from 'react-hook-form';
import { FaInfoCircle } from 'react-icons/fa';
import Textfield from '../controls/textfield';

interface PasswordCheckerProps {
  control: any;
}
const PasswordChecker = (props: PasswordCheckerProps) => {
  const { control } = props;
  const { dirtyFields } = useFormState();
  const password = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });
  const confirmPassword = useWatch({
    control,
    name: 'confirmPassword',
    defaultValue: '',
  });

  return (
    <div className="grid two mb-20">
      <Textfield
        // required
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your Password"
      />
      <Textfield
        // required
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Confirm your Password"
      />
      {password !== confirmPassword &&
        dirtyFields.password &&
        dirtyFields.confirmPassword && (
          <div className="flex" style={{ marginTop: '-1.8rem', color: 'red' }}>
            <FaInfoCircle className="ml-20 mr-10" style={{}} />
            Those passwords didn’t match. Try again
          </div>
        )}{' '}
    </div>
  );
};

export default PasswordChecker;
