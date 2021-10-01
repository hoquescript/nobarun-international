import React from 'react';
import { FaCamera, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';

const baseUrl =
  'https://eyeb3obcg1.execute-api.us-east-2.amazonaws.com/default/uploadAnyTypeMedia';
const objectBaseUrl = 'https://nobarun.s3.us-east-2.amazonaws.com';

import Textarea from '../controls/textarea';
import Textfield from '../controls/textfield';

import styles from '../../styles/pages/admin.module.scss';
import PasswordChecker from './PasswordChecker';

interface AccountInfoProps {
  images: string;
  setImages: any;
  setTabValue: any;
  isPasswordMatched: boolean;
  control: any;
}
const AccountInfo = (props: AccountInfoProps) => {
  const { images, setImages, setTabValue, isPasswordMatched, control } = props;
  console.log(isPasswordMatched);
  const imageUploadHandler = async (e) => {
    const { files } = e.target;
    if (files) {
      for (let i = 0; i < files?.length; i++) {
        const { Key, uploadURL } = await (await axios.get(baseUrl)).data;
        const { url } = await (await axios.put(uploadURL, files[i])).config;
        const objectUrl = `${objectBaseUrl}/${Key}`;
        console.log(objectUrl);
        setImages(objectUrl);
      }
    }
  };
  return (
    <>
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
          <PasswordChecker control={control} />
          <div className="grid one mb-20">
            <Textarea name="notes" label="Add your Notes" />
          </div>
        </div>
        <div className={styles.addAdmin__seperator} />
        <div className={styles.addAdmin__upload}>
          <div className="product-images">
            {images ? (
              <div className="product-images">
                <figure style={{ height: '20rem', width: '20rem' }}>
                  <button type="button" className="remove-image">
                    <i className="times-icon"></i>
                  </button>
                  <img src={images} alt="" style={{ borderRadius: '50%' }} />
                </figure>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  id="product"
                  accept="image/*, video/*"
                  style={{ display: 'none', height: '71px' }}
                  onChange={(e) => imageUploadHandler(e)}
                />

                <label
                  className={styles.addAdmin__image_upload}
                  htmlFor="product"
                >
                  <FaCamera />
                  <h5>Add Profile Image</h5>
                </label>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="center mt-40 mb-30">
        <button className="btn-green" onClick={() => setTabValue('permission')}>
          Next Page
        </button>
      </div>
    </>
  );
};

export default AccountInfo;
