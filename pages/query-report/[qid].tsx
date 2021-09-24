import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';

import Textarea from '../../components/controls/textarea';
import Textfield from '../../components/controls/textfield';

import styles from '../../styles/pages/query-report.module.scss';

const ADD_NEW_QUERY = gql`
  mutation addNewQuery($data: AddQueryUserInput!) {
    addNewQueryUserByAdmin(data: $data) {
      name
    }
  }
`;

const AddNewQuery = () => {
  const methods = useForm();
  const [createQuery] = useMutation(ADD_NEW_QUERY);

  const addNewQuery = (data) => {
    const query = {
      company: data.companyName,
      email: data.email,
      name: data.fullName,
      message: data.message,
      notes: data.notes,
      phone: data.number,
      address: data.address,
      product: '614dba9ac8d3558394d7e4a8',
      attachment:
        'https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png',
    };
    console.log(query);

    createQuery({
      variables: {
        data: query,
      },
    });
  };
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
          <button
            className="btn-green"
            onClick={methods.handleSubmit(addNewQuery)}
          >
            Save
          </button>
        </div>
      </FormProvider>
    </div>
  );
};

export default AddNewQuery;
