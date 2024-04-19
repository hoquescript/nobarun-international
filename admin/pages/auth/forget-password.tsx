import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';
import { useAlert } from 'react-alert';

import Textfield from '../../components/controls/textfield';
import styles from '../../styles/pages/auth.module.scss';

const POST_FORGET_PASSWORD = gql`
  query forgetPassword($email: String!) {
    forgetPassword(email: $email)
  }
`;

const ForgetPassword = () => {
  const methods = useForm();
  const alert = useAlert();

  const onSubmit = async (data) => {
    try {
      await Client.request(POST_FORGET_PASSWORD, data);
      alert.info('A password resetting mail has been sent to your email');
    } catch (error) {
      alert.error('Your provided User Email Address is not Correct');
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
          <div className={styles.forget__info}>
            <h2 className="heading-primary">Enter Mail ID</h2>
            <p>
              Share your registered email id. you will receive reset password
              link.
            </p>
          </div>
          <Textfield
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your Email Address"
          />
          <input type="submit" className={styles.auth__button} value="Send" />
        </form>
      </FormProvider>
    </div>
  );
};

export default ForgetPassword;
