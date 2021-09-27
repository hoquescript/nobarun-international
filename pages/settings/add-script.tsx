import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { gql, useMutation } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { FaSave, FaEdit, FaPlusCircle, FaTrash } from 'react-icons/fa';
import useAllScripts from '../../hooks/Settings/useAllScripts';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

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
  const methods = useForm();
  const [scripts, setScripts] = useState({});

  const [createScript] = useMutation(CREATE_SCRIPT);
  const [editScriptTag] = useMutation(EDIT_SCRIPT);
  const [deleteScript] = useMutation(DELETE_SCRIPT);

  useEffect(() => {
    useAllScripts().then((data) => {
      setScripts(data);
    });
  }, []);

  const addScriptsHandler = () => {
    setScripts({
      ...scripts,
      [uuid()]: {
        header: '',
        footer: '',
        isModified: false,
        isDisabled: false,
        isNewScript: true,
      },
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

  const saveHandler = (id: string) => {
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
    script.isNewScript
      ? createScript({
          variables: {
            data: scriptTags,
          },
        })
      : editScriptTag({
          variables: {
            data: editScriptTags,
          },
        });

    setScripts({ ...scripts, [id]: script });
  };

  const editHandler = (id: string) => {
    const script = scripts[id];
    script.isDisabled = false;
    setScripts({ ...scripts, [id]: script });
  };

  const deleteHandler = (id: string) => {
    const newScripts = Object.keys(scripts).reduce((object, key) => {
      if (key !== id) {
        object[key] = scripts[key];
      }
      return object;
    }, {});
    deleteScript({
      variables: {
        id,
      },
    });
    setScripts(newScripts);
  };

  // name: '',
  //       whatsapp: '',
  //       logo: '',
  //       email: '',
  //       address: '',
  //       isDisabled: true,
  return (
    <div className="container center">
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
          <div className="wrapper-section">
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
                    onClick={() => deleteHandler(key)}
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
