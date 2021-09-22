import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { gql, useQuery, useMutation } from '@apollo/client';
import { FaEye, FaPlusCircle } from 'react-icons/fa';

import Combobox from '../../../components/controls/combobox';
import Textfield from '../../../components/controls/textfield';
import TextEditor from '../../../components/shared/TextEditor';

import styles from '../../../styles/pages/products.module.scss';

const CREATE_CATEGORY = gql`
  mutation createCategory(
    $name: String!
    $description: String!
    $image: String!
    $isPublished: Boolean!
    $parentCategory: ID
    $slug: String
  ) {
    createNewCategory(
      data: {
        name: $name
        description: $description
        image: $image
        isPublished: $isPublished
        parentCategory: $parentCategory
        slug: $slug
      }
    ) {
      id
      name
      description
      parentCategory
      slug
      image
    }
  }
`;

const GET_ALL_CATEGORY = gql`
  query allCategory {
    getAllTheCategory {
      id
      name
    }
  }
`;

const CategoryForm = () => {
  const methods = useForm();
  const {
    query: { fid },
  } = useRouter();

  const [description, setDescription] = useState('');

  const { loading: l, error: e, data: category } = useQuery(GET_ALL_CATEGORY);

  const categories: { [key: string]: string } = {};
  category?.getAllTheCategory.forEach((dt) => {
    categories[dt.name] = dt.id;
  });

  const [createCategory, { data, loading, error }] =
    useMutation(CREATE_CATEGORY);

  const onSubmit = (data) => {
    const { categoryName, categorySlug, parentCategory } = data;
    createCategory({
      variables: {
        name: categoryName,
        description,
        image:
          'https://www.wpbeginner.com/wp-content/uploads/2019/12/What-is-Category.jpg',
        isPublished: true,
        parentCategory: parentCategory,
        slug: categorySlug,
      },
    });
  };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
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
        <h2 className="heading-primary">Add Category</h2>
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
                label="Name"
                placeholder="Enter Category Name"
                name="categoryName"
              />
            </div>
            <div className="grid one mb-20">
              <Textfield
                label="Slug"
                placeholder="Enter Category Slug"
                name="categorySlug"
              />
            </div>
            <div className="grid three mb-20">
              <Combobox
                name="parentCategory"
                label="Parent Category"
                options={l ? [] : categories}
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

export default CategoryForm;
