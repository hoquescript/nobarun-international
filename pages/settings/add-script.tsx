import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { gql, useMutation } from '@apollo/client';
import { useAlert } from 'react-alert';
import { useForm, FormProvider } from 'react-hook-form';
import { FaSave, FaEdit, FaPlusCircle, FaTrash } from 'react-icons/fa';
import useAllScripts from '../../hooks/Settings/useAllScripts';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Modal from '../../components/shared/Modal';

const CREATE_SCRIPT = gql`
  mutation addNewScripts($data: CreateScript!) {
    createNewScript(data: $data) {
      headerScript
    }
  }
`;
const EDIT_SCRIPT = gql`
  mutation editScript($data: EditScript!) {
    editScript(data: $data)
  }
`;
const DELETE_SCRIPT = gql`
  mutation deleteScript($id: String!) {
    deleteDcript(collectionId: $id)
  }
`;

const AddScript = () => {
  const alert = useAlert();
  const methods = useForm();
  const [scripts, setScripts] = useState({});
  const [deleteKey, setDeleteKey] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [createScript, createState] = useMutation(CREATE_SCRIPT);
  const [editScriptTag, editState] = useMutation(EDIT_SCRIPT);
  const [deleteScript, deleteState] = useMutation(DELETE_SCRIPT);

  useEffect(() => {
    useAllScripts().then((data) => {
      setScripts(data);
    });
  }, []);

  const addScriptsHandler = () => {
    setScripts({
      [uuid()]: {
        header: '',
        footer: '',
        isModified: false,
        isDisabled: false,
        isNewScript: true,
      },
      ...scripts,
    });
  };

  const handleChangeInput = (
    id: string,
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const script = scripts[id];
    script[name] = value;
    setScripts({ ...scripts, [id]: script });
  };

  const saveHandler = async (id: string) => {
    const script = scripts[id];
    script.isDisabled = true;

    const scriptTags = {
      headerScript: script.header,
      footerScript: script.footer,
    };

    const editScriptTags = {
      editId: id,
      editableObject: scriptTags,
    };
    if (script.isNewScript) {
      await createScript({
        variables: {
          data: scriptTags,
        },
      });
      if (!createState.error) {
        alert.success('Saved Scripts Successfully');
      } else {
        alert.error(createState.error.message);
      }
    } else {
      await editScriptTag({
        variables: {
          data: editScriptTags,
        },
      });
      if (!editState.error) {
        alert.info('Edited Scripts Successfully');
      } else {
        alert.error(editState.error.message);
      }
    }
    setScripts({ ...scripts, [id]: script });
  };

  const editHandler = (id: string) => {
    const script = scripts[id];
    script.isDisabled = false;
    setScripts({ ...scripts, [id]: script });
  };

  const deleteHandler = async (id: string) => {
    const newScripts = Object.keys(scripts).reduce((object, key) => {
      if (key !== id) {
        object[key] = scripts[key];
      }
      return object;
    }, {});
    await deleteScript({
      variables: {
        id,
      },
    });
    if (!deleteState.error) {
      alert.error('Deleted Scripts Successfully');
    } else {
      alert.error(deleteState.error.message);
    }
    setScripts(newScripts);
  };

  const openModal = (key) => {
    setShowDeleteModal(true);
    setDeleteKey(key);
  };
  return (
    <div className="container center">
      <Modal
        title="301 Redirect"
        modalIsOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        confirmHandler={() => deleteHandler(deleteKey)}
      />
      <FormProvider {...methods}>
        <div className="flex sb">
          <h1 className="heading-primary mt-40 mb-40">Add Scripts</h1>
          <div>
            <button
              type="button"
              className="btn-outline-green mr-20"
              onClick={addScriptsHandler}
            >
              <FaPlusCircle className="btn-icon-small" />
              Add Script
            </button>
          </div>
        </div>
        {Object.keys(scripts).map((key: string) => (
          <div className="wrapper-section" key={key}>
            <div className="wrapper-section__content">
              <div className="row">
                <div className="col-5">
                  <div className="field">
                    <label>Header Script</label>
                    <textarea
                      value={scripts[key].header}
                      className="custom-input"
                      name="header"
                      disabled={scripts[key].isDisabled}
                      onChange={(e) => handleChangeInput(key, e)}
                    />
                  </div>
                </div>
                <div className="col-5">
                  <div className="field">
                    <label>Footer Script</label>
                    <textarea
                      value={scripts[key].footer}
                      name="footer"
                      className="custom-input"
                      disabled={scripts[key].isDisabled}
                      onChange={(e) => handleChangeInput(key, e)}
                    />
                  </div>
                </div>
                <div className="col-2">
                  <button
                    type="button"
                    className="btn-icon-white ml-20"
                    onClick={
                      scripts[key].isDisabled
                        ? (e) => editHandler(key)
                        : (e) => saveHandler(key)
                    }
                  >
                    {scripts[key].isDisabled ? <FaEdit /> : <FaSave />}
                  </button>
                  <button
                    type="button"
                    className="btn-icon-white ml-20"
                    onClick={() => openModal(key)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
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

export default AddScript;
