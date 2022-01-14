import React, { useState, useMemo, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { v4 as uuid } from 'uuid';
import { FaEye, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import { useAlert } from 'react-alert';

import Combobox from '../../../components/controls/combobox';
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
import CategorySlug from '../../../components/products/CategorySlug';
import Togglebar from '../../../components/controls/togglebar';
import Checkbox from '../../../components/controls/checkbox';
import Textarea from '../../../components/controls/textarea';

const CREATE_CATEGORY = gql`
  mutation addNewCategory($data: CreateNewCategoryInput!) {
    addNewCategory(data: $data) {
      _id
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
  parentCategory: '',
  description: '',
  isPublished: false,
  isFeatured: false,
};

const CategoryForm = () => {
  const {
    query: { fid },
    asPath,
    push,
  } = useRouter();
  const alert = useAlert();
  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [categories, setCategories] = useState([]);

  const [createCategory, createState] = useMutation(CREATE_CATEGORY);
  const [editCategory, editState] = useMutation(EDIT_CATEGORY);

  useEffect(() => {
    useAllCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const dispatch = useTypedDispatch();

  const token = useTypedSelector((state) => state.ui.token);
  const icons = useTypedSelector(
    (state) => state.ui.productCategoryMedia.images,
  );
  const images = useTypedSelector(
    (state) => state.ui.productCategoryCoverMedia.images,
  );

  useEffect(() => {
    if (fid !== 'add') {
      setIsEditMode(true);
      useProductCategoryById(fid, token).then((data: any) => {
        methods.reset(data);
        dispatch(
          setMedia({ path: asPath, image: data.images, icons: data.icons }),
        );
      });
    }
  }, [token]);

  const formReset = () => {
    methods.reset(defaultValues);
    dispatch(resetMediaSelection());
  };
  const onSubmit = async (data) => {
    const { categoryName, categorySlug, parentCategory } = data;
    // console.log(data);
    const category = {
      name: categoryName,
      description: data.description,
      image: images[0],
      icon: icons[0],
      isPublished: data.isPublished,
      isFeatured: data.isFeatured,
      parentCategory: parentCategory,
      slug: categorySlug,
      id: '',
    };

    if (isEditMode) {
      delete category.parentCategory;
      category.id = data.id;
      try {
        await editCategory({
          variables: {
            data: {
              editId: fid,
              editableObject: category,
            },
          },
        });

        if (!editState.error) {
          alert.info('Edited Product Category Successfully');
        } else {
          throw editState.error.message;
        }
      } catch (error: any) {
        if (error.message) {
          alert.error(error.message);
        } else {
          alert.info('Edited Product Category Successfully');
        }
      }
    } else {
      category.id = uuid();
      try {
        await createCategory({
          variables: {
            data: category,
          },
        });
        if (!createState.error) {
          alert.success('Posted Product Category Successfully');
          formReset();
        } else {
          throw createState.error.message;
        }
      } catch (error: any) {
        if (error.message) {
          alert.error(error.message);
        } else {
          alert.success('Posted Product Category Successfully');
          formReset();
        }
      }
    }
  };

  const handleError = (error) => {
    Object.values(error).forEach((err) => {
      // @ts-ignore
      alert.error(err.message);
    });
  };

  return (
    <div className="container center">
      <Toolbar />
      <FormProvider {...methods}>
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
            <Togglebar name="isPublished" />
            <button
              type="button"
              className="btn-icon-white ml-20"
              onClick={methods.handleSubmit(onSubmit, handleError)}
            >
              <FaSave />
            </button>
            <button
              type="button"
              className="btn-icon-white ml-20"
              onClick={() => {
                formReset();
                setIsEditMode(false);
                push('/product/categories/add');
              }}
            >
              <FaPlus />
            </button>
            <button
              type="button"
              className="btn-icon-white ml-20"
              onClick={() => push('/product/categories')}
            >
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="wrapper-section">
          <div className="wrapper-section__content">
            <div className="row">
              <CategorySlug
                register={methods.register}
                control={methods.control}
                setValue={methods.setValue}
              />
              {!isEditMode && (
                <div className="col-4 mt-20">
                  <Combobox
                    name="parentCategory"
                    label="Parent Category"
                    placeholder="Select Category"
                    options={categories || []}
                  />
                </div>
              )}
              <div
                className={isEditMode ? 'col-2 mt-20' : 'col-2'}
                style={{
                  transform: isEditMode ? '' : 'translateY(15px)',
                  flexDirection: 'row',
                }}
              >
                <div className={`field`}>
                  <label>Category Image</label>
                  <FileButton showMedia page="pCategoryFeatured" />
                </div>
              </div>

              <div
                className={isEditMode ? 'col-3 mt-20' : 'col-3 ml-60'}
                style={{
                  transform: isEditMode ? '' : 'translateY(15px)',
                  flexDirection: 'row',
                }}
              >
                <div className={`field`}>
                  <label>Category Icon</label>
                  <FileButton showMedia page="pCategory" />
                </div>
              </div>
              <div className="col-12 mt-30">
                <Checkbox name="isFeatured">Featured Category</Checkbox>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper-section">
          <div className="wrapper-section__content">
            <Textarea name="description" label="Description" />
          </div>
        </div>
        <div className="center mt-30">
          <button
            className="btn-green"
            onClick={methods.handleSubmit(onSubmit, handleError)}
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
