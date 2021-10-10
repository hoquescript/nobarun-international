import React, { useState, useMemo, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { v4 as uuid } from 'uuid';
import { FaEye, FaSave, FaTimes } from 'react-icons/fa';
import { useAlert } from 'react-alert';

import Combobox from '../../components/controls/combobox';
import TextEditor from '../../components/shared/TextEditor';

import {
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks/useTypedSelector';
import useAllCategories from '../../hooks/Products/useAllCategories';
import useProductCategoryById from '../../hooks/Products/useProductCategoryById';
import FileButton from '../../components/controls/file';
import Toolbar from '../../components/shared/Toolbar';

import { resetMediaSelection, setMedia } from '../../store/slices/ui';
import Togglebar from '../../components/controls/togglebar';
import Textfield from '../../components/controls/textfield';

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
  clientName: '',
  relatedCategory: '',
};

const AddClient = () => {
  const {
    query: { clid },
    asPath,
    push,
  } = useRouter();
  const alert = useAlert();
  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [description, setDescription] = useState('');
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
  const images = useTypedSelector((state) => state.ui.clientMedia.images);

  useEffect(() => {
    if (clid !== 'add-new-client') {
      setIsEditMode(true);
      useProductCategoryById(clid, token).then((data) => {
        console.log(data);
        methods.reset(data);
        // @ts-ignore
        dispatch(setMedia({ path: asPath, src: data.image }));
        // @ts-ignore
        setDescription(data.description);
      });
    }
  }, [token]);

  const onSubmit = async (data) => {
    // const { categoryName, categorySlug, parentCategory } = data;
    console.log({ ...data, description, logo: images[0] });
    // const client = {
    //   name: categoryName,
    //   description,
    //   image: images[0],
    //   isPublished: data.isPublished,
    //   parentCategory: parentCategory,
    //   slug: categorySlug,
    //   id: uuid(),
    // };

    methods.reset(defaultValues);
    dispatch(resetMediaSelection());
    setDescription('');
    // if (isEditMode) {
    //   delete category.parentCategory;
    //   await editCategory({
    //     variables: {
    //       data: {
    //         editId: clid,
    //         editableObject: category,
    //       },
    //     },
    //   });
    //   if (!editState.error) {
    //     alert.info('Edited Query Successfully');
    //   } else {
    //     alert.error(editState.error.message);
    //   }
    // } else {
    //   await createCategory({
    //     variables: {
    //       data: category,
    //     },
    //   });
    //   if (!createState.error) {
    //     alert.success('Posted Query Successfully');
    //   } else {
    //     alert.error(createState.error.message);
    //   }
    // }
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
          <h2 className="heading-primary">Add Client</h2>
          <div>
            <Togglebar name="isPublished" />
            <button
              type="button"
              className="btn-icon-white ml-20"
              onClick={methods.handleSubmit(onSubmit)}
            >
              <FaSave />
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
              <div className="col-12">
                <Textfield
                  label="Client Name"
                  placeholder="Enter Client Name"
                  name="clientName"
                />
              </div>
              {!isEditMode && (
                <div className="col-4 mt-20">
                  <Combobox
                    name="relatedCategory"
                    label="Related Category"
                    placeholder="Related Category"
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
                <div className={`field`}>
                  <label>Company Logo</label>
                  <FileButton showMedia page="client" />
                </div>
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
              <TextEditor
                value={description}
                onChange={(content: string) => setDescription(content)}
              />
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

export default AddClient;
