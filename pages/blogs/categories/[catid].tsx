import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { gql, useQuery, useMutation } from '@apollo/client';
import { FaEye, FaPlusCircle } from 'react-icons/fa';
import Combobox from '../../../components/controls/combobox';

import Textfield from '../../../components/controls/textfield';
import TextEditor from '../../../components/shared/TextEditor';
import Togglebar from '../../../components/controls/togglebar';

const CREATE_CATEGORY = gql`
  mutation addNewCategory($data: CreateNewBlogCategoryInput!) {
    addNewBlogCategory(data: $data) {
      id
    }
  }
`;

const AddCategory = () => {
  const methods = useForm();
  const [createCategory] = useMutation(CREATE_CATEGORY);

  const [description, setDescription] = useState('');
  const onSubmit = (data) => {
    console.log(data);
    createCategory({
      variables: {
        ...data,
        description,
      },
    });
  };
  return (
    <div className="container center">
      <FormProvider {...methods}>
        <div className="main__content__header flex sb">
          <h2 className="heading-primary">Product Editor</h2>
          <div>
            <Togglebar name="isPublished" />
            <button type="button" className="btn-icon-white ml-20">
              <FaEye />
            </button>
          </div>
        </div>
        <div className="wrapper-section">
          <div className="wrapper-section__content">
            <div className="grid one mb-20">
              <Textfield
                name="name"
                label="Category Name"
                placeholder="Enter your Name"
              />
            </div>
            <div className="grid one mb-20">
              <Textfield
                name="slug"
                label="Slug"
                placeholder="Enter your Name"
              />
            </div>
            <div className="grid three mb-20">
              <Combobox
                name="parentCategory"
                label="Parent Category"
                placeholder="Select Category"
                options={[{ id: '56', value: 'Hello' }]}
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

export default AddCategory;
