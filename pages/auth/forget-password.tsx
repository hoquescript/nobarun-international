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
        <div className={styles.forget__info}>
          <h2 className="heading-primary">Enter Mail ID</h2>
          <p>
            Share your registered email id. you will receive reset password
            link.
          </p>
        </div>
        <Textfield label="Email" placeholder="Enter your Email Address" />
        <button className={styles.auth__button}>Send</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
