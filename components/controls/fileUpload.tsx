import React, { forwardRef } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

const baseUrl =
  'https://eyeb3obcg1.execute-api.us-east-2.amazonaws.com/default/uploadAnyTypeMedia';
const objectBaseUrl = 'https://nobarun.s3.us-east-2.amazonaws.com';

interface InputFileProps {
  onChangeHandler: any;
  disabled?: boolean;
  className?: string;
  // fileInputRef: any;
}

export const InputFileUpload = forwardRef((props: InputFileProps, ref) => {
  const { disabled, className, onChangeHandler } = props;
  const imageUploadHandler = async (e) => {
    const { files } = e.target;
    if (files) {
      for (let i = 0; i < files?.length; i++) {
        const { Key, uploadURL } = await (await axios.get(baseUrl)).data;
        const { url } = await (await axios.put(uploadURL, files[i])).config;
        const objectUrl = `${objectBaseUrl}/${Key}`;
        onChangeHandler(objectUrl);
      }
    }
  };
  return (
    <input
      // @ts-ignore
      ref={ref}
      type="file"
      className={`custom-input ${className}`}
      placeholder="Name"
      disabled={disabled}
      onChange={(e) => imageUploadHandler(e)}
    />
  );
});

export const BoxFileupload = (props: InputFileProps) => {
  const { disabled, onChangeHandler } = props;
  const imageUploadHandler = async (e) => {
    const { files } = e.target;
    if (files) {
      for (let i = 0; i < files?.length; i++) {
        const { Key, uploadURL } = await (await axios.get(baseUrl)).data;
        const { url } = await (await axios.put(uploadURL, files[i])).config;
        const objectUrl = `${objectBaseUrl}/${Key}`;
        onChangeHandler(objectUrl);
      }
    }
  };

  return (
    <div className="product-images">
      <input
        type="file"
        id="product"
        disabled={disabled}
        accept="image/*, video/*"
        style={{ display: 'none', height: '71px' }}
        onChange={(e) => imageUploadHandler(e)}
      />

      <label
        className="add-new-image"
        htmlFor="product"
        style={{
          height: '85px',
          width: '65px',
          margin: 'auto',
        }}
      >
        <FaPlus />
      </label>
    </div>
  );
};
