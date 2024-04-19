import React, { forwardRef } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

const baseUrl =
  'https://xwkodx6vi3.execute-api.ap-south-1.amazonaws.com/v1?extension=';

interface InputFileProps {
  onChangeHandler: any;
  disabled?: boolean;
  className?: string;
  // fileInputRef: any;
}

export const BoxFileupload = (props: InputFileProps) => {
  const { disabled, onChangeHandler } = props;
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

        onChangeHandler(obj_location);
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
