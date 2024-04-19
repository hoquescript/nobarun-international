import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useAlert } from 'react-alert';

import Textfield from '../../../components/controls/textfield';
import styles from '../../../styles/pages/auth.module.scss';

const RESET_PASSWORD = gql`
  mutation reset($data: ResetPassword!) {
    resetPassword(data: $data)
  }
`;
const ResetPassword = () => {
  const methods = useForm();
  const alert = useAlert();

  const { uid } = useRouter().query;
  const [resetPassword] = useMutation(RESET_PASSWORD);

  const [error, setError] = useState(false);
  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError(true);
    } else {
      try {
        await resetPassword({
          variables: {
            data: {
              token: uid,
              password: data.password,
            },
          },
        });
        alert.info('Password resetted successfully. 😃');
      } catch (err) {
        alert.error("Sorry, We couldn't reset your password. 😟");
      }
    }
  };
  return (
    <div className={styles.auth}>
      <FormProvider {...methods}>
        <form
          className={styles.auth__form}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <img
            src="/images/logo.png"
            alt="Logo of Nobarun"
            className={styles.auth__logo}
          />
          <h2 className="heading-primary" style={{ textAlign: 'center' }}>
            Reset Password
          </h2>
          <Textfield
            className="mt-30 mb-30"
            name="password"
            type="password"
            label="New Password"
            placeholder="Enter your Password"
          />
          <Textfield
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your Password"
          />
          <div className={`${error ? 'flex sb' : ''} mt-30`}>
            {error && (
              <p style={{ color: 'red' }}>* Passwords didn't matched</p>
            )}
          </div>
          <input
            type="submit"
            className={`mb-50 ${styles.auth__button}`}
            value="Reset Password"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default ResetPassword;
