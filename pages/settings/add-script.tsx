import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useForm, FormProvider } from 'react-hook-form';
import {
  FaEllipsisH,
  FaSave,
  FaEdit,
  FaPlusCircle,
  FaTrash,
  FaPlus,
} from 'react-icons/fa';
import Textarea from '../../components/controls/textarea';

const AddScript = () => {
  const methods = useForm();
  const [scripts, setScripts] = useState({
    [uuid()]: {
      header:
        '<script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script>',
      footer:
        '<script src="chrome-extension://mdhmgoflnkccjhcfbojdagggmklgfloo/inpage.js" id="blockstack-app"></script>',
      isModified: false,
      isDisabled: true,
    },
  });

  const addScriptsHandler = () => {
    setScripts({
      ...scripts,
      [uuid()]: {
        header: '',
        footer: '',
        isModified: false,
        isDisabled: false,
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
    setScripts(newScripts);
  };

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

export default AddScript;
