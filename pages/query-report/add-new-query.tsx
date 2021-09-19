import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Textarea from '../../components/controls/textarea';
import Textfield from '../../components/controls/textfield';

import styles from '../../styles/pages/query-report.module.scss';

const AddNewQuery = () => {
  const methods = useForm();
  return (
    <div className={styles.addNewQuery}>
      <h1 className="heading-primary ml-5 mb-40">Add New Query</h1>
      <FormProvider {...methods}>
        <div className="grid two mb-20">
          <Textfield
            name="fullName"
            label="Full Name"
            placeholder="Enter your Name"
          />
          <Textfield
            type="tel"
            name="number"
            label="Phone"
            placeholder="Enter your Number"
          />
        </div>
        <div className="grid two mb-20">
          <Textfield
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your Email"
          />
          <Textfield
            name="address"
            label="Address"
            placeholder="Enter your Address"
          />
        </div>
        <div className="grid two mb-20">
          <Textfield
            type="file"
            name="attachments"
            label="Attachments"
            placeholder="Enter your Attachments"
          />
          <Textfield
            name="companyName"
            label="Company Name"
            placeholder="Enter your Company Name"
          />
        </div>
        <div className="grid one mb-20">
          <Textarea name="message" label="Message" />
        </div>
        <div className="grid one mb-20">
          <Textarea name="notes" label="Add your Notes" />
        </div>
        <div className="center mt-30">
          <button className="btn-green">Save</button>
        </div>
      </FormProvider>
    </div>
  );
};

export default AddNewQuery;
