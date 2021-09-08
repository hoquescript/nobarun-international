import React from 'react';
import Textfield from '../../components/controls/textfield';

import styles from '../../styles/pages/auth.module.scss';

const Login = () => {
  return (
    <div className={styles.auth}>
      <form className={styles.auth__form}>
        <img
          src="/images/logo.png"
          alt="Logo of Nobarun"
          className={styles.auth__logo}
        />
        <Textfield
          className="mb-30"
          label="Name"
          placeholder="Enter your Name"
        />
        <Textfield
          type="password"
          label="Password"
          placeholder="Enter your Password"
        />
        <a href="/auth/forget-password" className={styles.auth__forgetPassword}>
          Forgot Password?
        </a>
        <button className={styles.auth__button}>Login</button>
      </form>
    </div>
  );
};

export default Login;
