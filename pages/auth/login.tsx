import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { signIn } from 'next-auth/client';

import Textfield from '../../components/controls/textfield';

import styles from '../../styles/pages/auth.module.scss';

const Login = () => {
  const methods = useForm();
  const onSubmit = (data: any) => {
    const { email, password } = data;
    signIn('credentials', {
      email,
      password,
      callbackUrl: `${window.location.origin}/`,
    });
  };
  return (
    <div className={styles.auth}>
      <FormProvider {...methods}>
        <form className={styles.auth__form}>
          <img
            src="/images/logo.png"
            alt="Logo of Nobarun"
            className={styles.auth__logo}
          />
          <Textfield
            className="mb-30"
            label="Email"
            type="email"
            name="email"
            value="azim@gmail.com"
            placeholder="Enter your Name"
          />
          <Textfield
            type="password"
            label="Password"
            value="iwilldoit"
            placeholder="Enter your Password"
            name="password"
          />
          <a
            href="/auth/forget-password"
            className={styles.auth__forgetPassword}
          >
            Forgot Password?
          </a>
          <button
            className={styles.auth__button}
            onClick={methods.handleSubmit(onSubmit)}
          >
            Login
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
