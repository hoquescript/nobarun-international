import React, { useState, useMemo, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { useForm, FormProvider } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { FaEye, FaPlusCircle } from 'react-icons/fa';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import Combobox from '../../../components/controls/combobox';

import Textfield from '../../../components/controls/textfield';
import TextEditor from '../../../components/shared/TextEditor';
import Togglebar from '../../../components/controls/togglebar';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import useAllBlogCategories from '../../../hooks/Blogs/useAllBlogCategory';
import useBlogCategoryById from '../../../hooks/Blogs/useBlogCategoryById';

const CREATE_CATEGORY = gql`
  mutation addNewBlogCategory($data: CreateNewBlogCategoryInput!) {
    addNewBlogCategory(data: $data) {
      id
    }
  }
`;

const EDIT_CATEGORY = gql`
  mutation editBlogCategory($data: EditBlogCategory!) {
    editBlogCategory(data: $data)
  }
`;

const defaultValues = {
  name: '',
  description: '',
  image: '',
  slug: '',
  isPublished: false,
  parentCategory: '',
};

const AddCategory = () => {
  const router = useRouter();
  const catid = router.query.catid;

  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [editCategory] = useMutation(EDIT_CATEGORY);

  const textEditorRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');

  const token = useTypedSelector((state) => state.ui.token);
  useEffect(() => {
    if (catid !== 'add') {
      setIsEditMode(true);
      useBlogCategoryById(catid, token).then((data) => {
        methods.reset(data);
        // @ts-ignore
        setDescription(data.description);
        // @ts-ignore
        // textEditorRef.current.set(data.description);
      });
    }
  }, [token]);

  useEffect(() => {
    useAllBlogCategories().then((category) => setCategories(category));
  }, []);

  const onSubmit = (data) => {
    const category = {
      name: data.name,
      description,
      image: '',
      slug: data.slug,
      isPublished: data.isPublished,
      parentCategory: data.parentCategory,
      id: uuid(),
    };
    methods.reset(defaultValues);
    // @ts-ignore
    textEditorRef.current.reset();
    if (isEditMode) {
      // @ts-ignore
      delete category.id;
      delete category.parentCategory;
      editCategory({
        variables: {
          data: {
            editId: catid,
            editableObject: category,
          },
        },
      });
    } else {
      createCategory({
        variables: {
          data: category,
        },
      });
    }
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
            {!isEditMode && (
              <div className="grid three mb-20">
                <Combobox
                  name="parentCategory"
                  label="Parent Category"
                  placeholder="Select Category"
                  options={categories || []}
                />
              </div>
            )}
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
              <TextEditor ref={textEditorRef} setValue={setDescription} />
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default AddCategory;
