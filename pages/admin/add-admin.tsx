import React from 'react';

import Textfield from '../../components/controls/textfield';
import Textarea from '../../components/controls/textarea';

import styles from '../../styles/pages/admin.module.scss';

const AddAdmin = () => {
  return (
    <div className={styles.addAdmin}>
      <h1 className="heading-primary ml-5 mb-40">Add New Admin</h1>
      <div className={styles.addAdmin__wrapper}>
        <div className={styles.addAdmin__form}>
          <div className="grid two mb-20">
            <Textfield
              required
              label="First Name"
              placeholder="Enter your Name"
            />
            <Textfield
              required
              label="Last Name"
              placeholder="Enter your Name"
            />
          </div>
          <div className="grid two mb-20">
            <Textfield
              required
              label="Display Name"
              placeholder="Enter your Display Name"
            />
            <Textfield label="Location" placeholder="Enter your Address" />
          </div>
          <div className="grid two mb-20">
            <Textfield
              required
              type="email"
              label="Email"
              placeholder="Enter your Email"
            />
            <Textfield
              type="tel"
              label="Phone"
              placeholder="Enter your Number"
            />
          </div>
          <div className="grid two mb-20">
            <Textfield
              required
              type="password"
              label="Password"
              placeholder="Enter your Password"
            />
            <Textfield
              required
              type="password"
              label="Confirm Password"
              placeholder="Confirm your Password"
            />
          </div>
          <div className="grid one mb-20">
            <Textarea label="Add your Notes" />
          </div>
          <div className="center mt-30">
            <button className="btn-green">Save</button>
          </div>
        </div>
        <div className={styles.addAdmin__seperator} />
        <div className={styles.addAdmin__upload}></div>
      </div>
    </div>
  );
};

export default AddAdmin;
