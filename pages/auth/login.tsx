import React from 'react';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { signIn } from 'next-auth/client';

import Textfield from '../../components/controls/textfield';

import styles from '../../styles/pages/auth.module.scss';

const Login = () => {
  const methods = useForm();
  const { error } = useRouter().query;

  const onSubmit = (data: any) => {
    const { email, password } = data;
    signIn('credentials', {
      email,
      password,
      callbackUrl: `${window.location.origin}/`,
    });
    methods.reset({ email: '', password: '' });
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
          <Textfield
            className="mb-30"
            label="Email"
            type="email"
            name="email"
            // value="iss@gmail.com"
            placeholder="Enter your Name"
          />
          <Textfield
            type="password"
            label="Password"
            // value="one123123"
            placeholder="Enter your Password"
            name="password"
          />
          <div className={`${error ? 'flex sb' : ''} mt-30`}>
            {error && <p style={{ color: 'red' }}>* Wrong Email or Password</p>}
            <a
              href="/auth/forget-password"
              className={styles.auth__forgetPassword}
            >
              Forgot Password?
            </a>
          </div>
          <input type="submit" className={styles.auth__button} value="Login" />
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
