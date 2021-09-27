import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

import Textfield from '../../components/controls/textfield';
import styles from '../../styles/pages/auth.module.scss';

const POST_FORGET_PASSWORD = gql`
  query forgetPassword {
    forgetPassword(email: "wahidhoquee@gmail.com")
  }
`;

const ForgetPassword = () => {
  const methods = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
    // console.log(data);
    await Client.request(POST_FORGET_PASSWORD, data);
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
          <div className={styles.forget__info}>
            <h2 className="heading-primary">Enter Mail ID</h2>
            <p>
              Share your registered email id. you will receive reset password
              link.
            </p>
          </div>
          <Textfield
            name="email"
            label="Email"
            placeholder="Enter your Email Address"
          />
          <input type="submit" className={styles.auth__button} value="Send" />
          {/* <button
            className={styles.auth__button}
            onClick={methods.handleSubmit(onSubmit)}
          >
            Send
          </button> */}
        </form>
      </FormProvider>
    </div>
  );
};

export default ForgetPassword;
