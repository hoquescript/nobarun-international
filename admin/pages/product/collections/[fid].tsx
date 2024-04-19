import React, { useState, useMemo, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';
import { FormProvider, useForm } from 'react-hook-form';
import { FaEye, FaPlus, FaPlusCircle, FaSave, FaTimes } from 'react-icons/fa';

import FileButton from '../../../components/controls/file';
import Textfield from '../../../components/controls/textfield';
import Togglebar from '../../../components/controls/togglebar';
import TextEditor from '../../../components/shared/TextEditor';
import Toolbar from '../../../components/shared/Toolbar';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../../hooks/useTypedSelector';
import { resetMediaSelection, setMedia } from '../../../store/slices/ui';
import useCollectionById from '../../../hooks/Products/useProductCollectionById';
import CollectionSlug from '../../../components/products/CollectionSlug';

const CREATE_COLLECTION = gql`
  mutation addCollection($data: CreateNewCollectionInput!) {
    createNewCollection(data: $data) {
      id
    }
  }
`;

const EDIT_COLLECTION = gql`
  mutation editCollection($data: EditCollection!) {
    editCollection(data: $data)
  }
`;

const defaultValues = {
  collectionName: '',
  collectionSlug: '',
  isPublished: false,
};
const CollectionForm = () => {
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
  const [description, setDescription] = useState('');

  const [createCollection, createState] = useMutation(CREATE_COLLECTION);
  const [editCollection, editState] = useMutation(EDIT_COLLECTION);

  const dispatch = useTypedDispatch();

  const token = useTypedSelector((state) => state.ui.token);
  const images = useTypedSelector(
    (state) => state.ui.productCollectionMedia.images,
  );
  useEffect(() => {
    if (fid !== 'add') {
      setIsEditMode(true);
      useCollectionById(fid, token).then((data) => {
        methods.reset(data);
        // @ts-ignore
        dispatch(setMedia({ path: asPath, src: data.image }));
        // @ts-ignore
        setDescription(data.description);
      });
    }
  }, [token]);

  const formReset = () => {
    methods.reset(defaultValues);
    dispatch(resetMediaSelection());
    setDescription('');
  };

  const onSubmit = async (data) => {
    const { collectionName, collectionSlug, isPublished } = data;
    const collection = {
      name: collectionName,
      description: description,
      image: images[0],
      slug: collectionSlug,
      isPublished: isPublished,
    };

    if (isEditMode) {
      try {
        await editCollection({
          variables: {
            data: {
              editId: fid,
              editableObject: collection,
            },
          },
        });
        if (!editState.error) {
          alert.info('Edited Product Collection Successfully');
        } else {
          throw editState.error.message;
        }
      } catch (error: any) {
        if (error.message) {
          alert.error(error.message);
        } else {
          alert.info('Edited Product Collection Successfully');
        }
      }
    } else {
      try {
        await createCollection({
          variables: {
            data: collection,
          },
        });
        if (!createState.error) {
          alert.success('Posted Product Collection Successfully');
          formReset();
        } else {
          throw createState.error.message;
        }
      } catch (error: any) {
        if (error.message) {
          alert.error(error.message);
        } else {
          alert.success('Posted Product Collection Successfully');
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
          <h2 className="heading-primary">Add Collection</h2>
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
                push('/product/collections/add');
              }}
            >
              <FaPlus />
            </button>
            <button
              type="button"
              className="btn-icon-white ml-20"
              onClick={() => push('/product/collections')}
            >
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="wrapper-section">
          <div className="wrapper-section__content">
            <div className="row">
              <CollectionSlug
                register={methods.register}
                control={methods.control}
                setValue={methods.setValue}
              />
              <div className="col-6 mt-30">
                <FileButton showMedia page="pCollection" />
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

export default CollectionForm;
