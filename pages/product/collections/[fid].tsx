import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaEye, FaPlusCircle } from 'react-icons/fa';
import Textfield from '../../../components/controls/textfield';
import TextEditor from '../../../components/shared/TextEditor';

const CREATE_COLLECTION = gql`
  mutation addCollection($data: CreateNewCollectionInput!) {
    createNewCollection(data: $data) {
      id
    }
  }
`;

const CollectionForm = () => {
  const methods = useForm();
  const {
    query: { fid },
  } = useRouter();

  const [description, setDescription] = useState('');

  const [createCollection] = useMutation(CREATE_COLLECTION);

  const onSubmit = (data) => {
    const { collectionName, collectionSlug } = data;
    const collection = {
      name: collectionName,
      description: description,
      image: 'httphs',
      slug: collectionSlug,
      isPublished: true,
    };
    createCollection({
      variables: {
        data: collection,
      },
    });
  };

  return (
    <div className="container center">
      <div
        className="main__content__header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 className="heading-primary">Add Collection</h2>
        <div>
          <label htmlFor="publish" className="custom-switch ml-auto">
            <input type="checkbox" id="publish" />
            <span>Publish</span>
          </label>
          <button type="button" className="btn-icon-white ml-20">
            <FaEye />
          </button>
        </div>
      </div>
      <FormProvider {...methods}>
        <div className="wrapper-section">
          <div className="wrapper-section__content">
            <div className="grid one mb-20">
              <Textfield
                name="collectionName"
                label="Name"
                placeholder="Enter Category Name"
              />
            </div>
            <div className="grid one mb-20">
              <Textfield
                name="collectionSlug"
                label="Slug"
                placeholder="Enter Category Slug"
              />
            </div>
          </div>
        </div>
        <div className="wrapper-section">
          <div className="wrapper-section__title flex sb">
            <h3 className="heading-secondary">Description</h3>
            <button type="button" className="btn-outline-green">
              <FaPlusCircle className="btn-icon-small" />
              Add Description
            </button>
          </div>
          <div className="wrapper-section__content">
            <div className="field mt-20">
              <TextEditor setValue={setDescription} />
            </div>
          </div>
        </div>
        <div className="center mt-30">
          <button
            className="btn-green"
            onClick={methods.handleSubmit(onSubmit)}
          >
            Save
          </button>
        </div>
      </FormProvider>
    </div>
  );
};

export default CollectionForm;
