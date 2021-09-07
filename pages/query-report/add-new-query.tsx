import React from 'react';

import Textarea from '../../components/controls/textarea';
import Textfield from '../../components/controls/textfield';

import styles from '../../styles/pages/query-report.module.scss';

const AddNewQuery = () => {
  return (
    <div className={styles.addNewQuery}>
      <h1 className="heading-primary ml-5 mb-40">Add New Query</h1>
      <div className="grid two mb-20">
        <Textfield label="Full Name" placeholder="Enter your Name" />
        <Textfield type="tel" label="Phone" placeholder="Enter your Number" />
      </div>
      <div className="grid two mb-20">
        <Textfield type="email" label="Email" placeholder="Enter your Email" />
        <Textfield label="Address" placeholder="Enter your Address" />
      </div>
      <div className="grid two mb-20">
        <Textfield
          type="file"
          label="Attachments"
          placeholder="Enter your Number"
        />
        <Textfield label="Company Name" placeholder="Enter your Company Name" />
      </div>
      <div className="grid one mb-20">
        <Textarea label="Message" />
      </div>
      <div className="grid one mb-20">
        <Textarea label="Add your Notes" />
      </div>
      <div className="center mt-30">
        <button className="btn-green">Save</button>
      </div>
    </div>
  );
};

export default AddNewQuery;
