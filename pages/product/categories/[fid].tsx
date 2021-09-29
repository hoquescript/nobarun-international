import React, { useState, useMemo, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { v4 as uuid } from 'uuid';
import { FaEye } from 'react-icons/fa';

import Combobox from '../../../components/controls/combobox';
import Textfield from '../../../components/controls/textfield';
import TextEditor from '../../../components/shared/TextEditor';

import {
  useTypedDispatch,
  useTypedSelector,
} from '../../../hooks/useTypedSelector';
import useAllCategories from '../../../hooks/Products/useAllCategories';
import useProductCategoryById from '../../../hooks/Products/useProductCategoryById';
import FileButton from '../../../components/controls/file';
import Toolbar from '../../../components/shared/Toolbar';

import { resetMediaSelection, setMedia } from '../../../store/slices/ui';

const CREATE_CATEGORY = gql`
  mutation addNewCategory(
    $name: String!
    $description: String!
    $image: String!
    $slug: String
    $isPublished: Boolean!
    $id: String!
    $parentCategory: String!
  ) {
    addNewCategory(
      data: {
        name: $name
        description: $description
        image: $image
        slug: $slug
        isPublished: $isPublished
        id: $id
        parentCategory: $parentCategory
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

const EDIT_CATEGORY = gql`
  mutation editProductCategory($data: EditCategory!) {
    editCategory(data: $data)
  }
`;

const defaultValues = {
  categoryName: '',
  categorySlug: '',
  isPublished: false,
};

const CategoryForm = () => {
  const {
    query: { fid },
    asPath,
  } = useRouter();
  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const textEditorRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);

  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [editCategory] = useMutation(EDIT_CATEGORY);

  useEffect(() => {
    if (fid !== 'add') {
      useAllCategories().then((data) => {
        setCategories(data);
      });
    }
  }, []);

  const dispatch = useTypedDispatch();

  const token = useTypedSelector((state) => state.ui.token);
  const images = useTypedSelector(
    (state) => state.ui.productCategoryMedia.images,
  );

  useEffect(() => {
    if (fid !== 'add') {
      setIsEditMode(true);
      useProductCategoryById(fid, token).then((data) => {
        methods.reset(data);
        // @ts-ignore
        dispatch(setMedia({ path: asPath, src: data.image }));
        // @ts-ignore
        setDescription(data.description);
        // @ts-ignore
        // textEditorRef.current.set(data.description);
      });
    }
  }, [token]);

  const onSubmit = (data) => {
    const { categoryName, categorySlug, parentCategory } = data;
    const category = {
      name: categoryName,
      description,
      image: images[0],
      isPublished: true,
      parentCategory: parentCategory,
      slug: categorySlug,
      id: uuid(),
    };

    methods.reset(defaultValues);
    dispatch(resetMediaSelection());
    // @ts-ignore
    textEditorRef.current.reset();

    if (isEditMode) {
      delete category.parentCategory;
      editCategory({
        variables: {
          data: {
            editId: fid,
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
      <Toolbar />
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
            <div className="row">
              <div className="col-12">
                <Textfield
                  label="Name"
                  placeholder="Enter Category Name"
                  name="categoryName"
                />
              </div>
              <div className="col-12">
                <Textfield
                  label="Slug"
                  placeholder="Enter Category Slug"
                  name="categorySlug"
                />
              </div>
              {!isEditMode && (
                <div className="col-4">
                  <Combobox
                    name="parentCategory"
                    label="Parent Category"
                    placeholder="Select Category"
                    options={categories || []}
                  />
                </div>
              )}
              <div
                className={isEditMode ? 'col-6 mt-20' : 'col-6 ml-60'}
                style={{
                  transform: isEditMode ? '' : 'translateY(30px)',
                  flexDirection: 'row',
                }}
              >
                <FileButton showMedia page="pCategory" />
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper-section">
          <div className="wrapper-section__title flex sb">
            <h3 className="heading-secondary">Description</h3>
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

export default CategoryForm;
