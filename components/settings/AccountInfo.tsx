import React from 'react';
import { FaCamera, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';

const baseUrl =
  'https://xwkodx6vi3.execute-api.ap-south-1.amazonaws.com/v1?extension=';

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

  const imageUploadHandler = async (e) => {
    const { files } = e.target;
    if (files) {
      for (let i = 0; i < files?.length; i++) {
        const fileName = files[i].name;
        const extension = fileName.split('.').pop();

        const response = await axios.get(`${baseUrl}${extension}`);
        const { obj_location, fields, upload_url } = response.data;
        const formData = new FormData();
        formData.append('key', fields?.key);
        formData.append('policy', fields?.policy);
        formData.append('x-amz-algorithm', fields['x-amz-algorithm']);
        formData.append('x-amz-credential', fields['x-amz-credential']);
        formData.append('x-amz-date', fields['x-amz-date']);
        formData.append('x-amz-security-token', fields['x-amz-security-token']);
        formData.append('x-amz-signature', fields['x-amz-signature']);
        formData.append('file', files[i]);
        await axios.post(upload_url, formData);

        setImages(obj_location);
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
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => {
                      setImages('');
                    }}
                  >
                    <i className="times-icon"></i>
                  </button>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${images}`}
                    alt=""
                    style={{
                      borderRadius: '50%',
                      width: '20rem',
                      height: '20rem',
                    }}
                  />
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
