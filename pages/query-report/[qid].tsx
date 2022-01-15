import React, { useState, useMemo, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { useAlert } from 'react-alert';

import Textarea from '../../components/controls/textarea';
import Textfield from '../../components/controls/textfield';

import {
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks/useTypedSelector';

import useQueryById from '../../hooks/Query/useQueryById';
import styles from '../../styles/pages/query-report.module.scss';
import ProductCode from '../../components/shared/ProductCode';
import FileButton from '../../components/controls/file';
import Toolbar from '../../components/shared/Toolbar';
import { resetMediaSelection, setMedia } from '../../store/slices/ui';
import QueryCode from '../../components/shared/QueryCode';

const ADD_NEW_QUERY = gql`
  mutation addNewQuery($data: AddQueryUserInput!) {
    addNewQueryUserByAdmin(data: $data) {
      name
    }
  }
`;

const EDIT_NEW_QUERY = gql`
  mutation editQuery($data: EditQueryUserInput!) {
    editQueryUserInfo(data: $data)
  }
`;

const defaultValues = {
  companyName: '',
  email: '',
  fullName: '',
  message: '',
  notes: '',
  number: '',
  address: '',
  productCode: '',
};

const AddNewQuery = () => {
  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });
  const alert = useAlert();
  const router = useRouter();
  const qid = router.query.qid;

  const [createQuery, createState] = useMutation(ADD_NEW_QUERY);
  const [editQuery, editState] = useMutation(EDIT_NEW_QUERY);

  const [isEditMode, setIsEditMode] = useState(false);
  const attachment = useTypedSelector((state) => state.ui.queryMedia);
  const [productCode, setProductCode] = useState('');

  const dispatch = useTypedDispatch();

  const addNewQuery = async (data) => {
    const query = {
      company: data.companyName,
      email: data.email,
      name: data.fullName,
      message: data.message,
      notes: data.notes,
      phone: data.number,
      address: data.address,
      productCode: data.productCode,
      attachment: attachment.images[0],
    };

    if (isEditMode) {
      try {
        await editQuery({
          variables: {
            data: {
              editId: qid,
              editableObject: query,
            },
          },
        });
        if (!editState.error) {
          alert.info('Edited Query Successfully');
        } else {
          alert.error(editState.error.message);
        }
      } catch (error: any) {
        alert.error(error.message);
      }
    } else {
      try {
        await createQuery({
          variables: {
            data: query,
          },
        });

        if (!createState.error) {
          alert.success('Posted Query Successfully');
          // Resetting
          methods.reset(defaultValues);
          dispatch(resetMediaSelection());
        } else {
          alert.error(createState.error.message);
        }
      } catch (error: any) {
        alert.error(error.message);
      }
    }
  };

  const handleError = (error) => {
    Object.values(error).forEach((err) => {
      // @ts-ignore
      alert.error(err.message);
    });
  };

  const token = useTypedSelector((state) => state.ui.token);
  useEffect(() => {
    if (qid !== 'add-new-query') {
      setIsEditMode(true);
      useQueryById(qid, token).then((data: any) => {
        methods.reset(data);
        setProductCode(data.productCode);
        //! Attachment Resetting
        dispatch(setMedia({ path: router.asPath, src: data.attachment }));
        // setAttachment(data.attachment);
      });
    }
  }, [token]);

  return (
    <div className={styles.addNewQuery}>
      <Toolbar />
      <h1 className="heading-primary ml-5 mb-40">Add New Query</h1>
      <FormProvider {...methods}>
        <div className="grid two mb-20">
          <Textfield
            name="fullName"
            label="Full Name"
            required
            placeholder="Enter your Name"
          />
          <Textfield
            type="tel"
            name="number"
            label="Phone"
            required
            placeholder="Enter your Number"
          />
        </div>
        <div className="grid two mb-20">
          <Textfield
            type="email"
            name="email"
            label="Email"
            required
            placeholder="Enter your Email"
          />
          <Textfield
            name="address"
            label="Address"
            // required
            placeholder="Enter your Address"
          />
        </div>
        <div className="grid two mb-20">
          <div className="field">
            <label>Attachments</label>
            <FileButton showMedia page="query" />
          </div>
          <Textfield
            name="companyName"
            label="Company Name"
            placeholder="Enter your Company Name"
          />
        </div>
        <div className="grid three mt-30 mb-30">
          <QueryCode
            productCode={productCode}
            setProductCode={setProductCode}
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
            onClick={methods.handleSubmit(addNewQuery, handleError)}
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

export default AddNewQuery;
