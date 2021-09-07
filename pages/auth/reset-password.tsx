import React from 'react';

import Textfield from '../../components/controls/textfield';
import styles from '../../styles/pages/auth.module.scss';

const ForgetPassword = () => {
  return (
    <div className={styles.auth}>
      <form className={styles.auth__form}>
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
          type="password"
          label="New Password"
          placeholder="Enter your Password"
        />
        <Textfield
          type="password"
          label="Confirm Password"
          placeholder="Confirm your Password"
        />
        <button className={styles.auth__button}>Send</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
