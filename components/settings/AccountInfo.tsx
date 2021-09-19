import React from 'react';
import { FaCamera } from 'react-icons/fa';

import Textarea from '../controls/textarea';
import Textfield from '../controls/textfield';

import styles from '../../styles/pages/admin.module.scss';

const AccountInfo = () => {
  return (
    <div className={`${styles.addAdmin__wrapper} mt-60`}>
      <div className={styles.addAdmin__form}>
        <div className="grid two mb-20">
          <Textfield
            required
            name="firstName"
            label="First Name"
            placeholder="Enter your First Name"
          />
          <Textfield
            required
            name="lastName"
            label="Last Name"
            placeholder="Enter your Last Name"
          />
        </div>
        <div className="grid two mb-20">
          <Textfield
            required
            name="displayName"
            label="Display Name"
            placeholder="Enter your Display Name"
          />
          <Textfield
            name="address"
            label="Location"
            placeholder="Enter your Address"
          />
        </div>
        <div className="grid two mb-20">
          <Textfield
            required
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your Email"
          />
          <Textfield
            name="number"
            type="tel"
            label="Phone"
            placeholder="Enter your Number"
          />
        </div>
        <div className="grid two mb-20">
          <Textfield
            required
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your Password"
          />
          <Textfield
            required
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your Password"
          />
        </div>
        <div className="grid one mb-20">
          <Textarea name="notes" label="Add your Notes" />
        </div>
        <div className="center mt-30">
          <button className="btn-green">Save</button>
        </div>
      </div>
      <div className={styles.addAdmin__seperator} />
      <div className={styles.addAdmin__upload}>
        <div className="product-images">
          <input
            type="file"
            id="product"
            accept="image/*, video/*"
            style={{ display: 'none', height: '71px' }}
            // onChange={(e) => imageUploadHandler(e)}
          />

          <label className={styles.addAdmin__image_upload} htmlFor="product">
            <FaCamera />
            <h5>Add Profile Image</h5>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
