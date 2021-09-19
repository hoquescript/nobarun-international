import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  FaEllipsisH,
  FaLocationArrow,
  FaMailBulk,
  FaPen,
  FaPlusCircle,
  FaSave,
  FaTrash,
  FaUpload,
  FaUser,
  FaWhatsapp,
} from 'react-icons/fa';

const ContactPerson = () => {
  const [contacts, setContacts] = useState({
    [uuid()]: {
      name: 'Wahid Hoque',
      whatsapp: '01798323483',
      logo: '',
      email: 'wahidhoquee@gmail.com',
      address: 'House-478, Road-12, Mohakhali DOHS',
      isPublished: false,
      isDisabled: true,
    },
  });

  const addScriptsHandler = () => {
    setContacts({
      ...contacts,
      [uuid()]: {
        name: '',
        whatsapp: '',
        logo: '',
        email: '',
        address: '',
        isPublished: true,
        isDisabled: false,
      },
    });
  };

  const saveHandler = (id: string) => {
    const contact = contacts[id];
    contact.isDisabled = true;
    setContacts({ ...contacts, [id]: contact });
  };

  const editHandler = (id: string) => {
    const contact = contacts[id];
    contact.isDisabled = false;
    setContacts({ ...contacts, [id]: contact });
  };

  const deleteHandler = (id: string) => {
    const newContacts = Object.keys(contacts).reduce((object, key) => {
      if (key !== id) {
        object[key] = contacts[key];
      }
      return object;
    }, {});
    setContacts(newContacts);
  };

  const handleChangeInput = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // @ts-ignore
    const { name, value, checked } = event.target;
    const contact = contacts[id];
    if (name === 'isPublished') {
      contact[name] = checked;
    } else {
      // @ts-ignore
      contact[name] = value;
    }
    setContacts({ ...contacts, [id]: contact });
  };
  console.log(contacts);
  return (
    <div className="container center">
      <div className="flex sb mt-40 mb-20">
        <h1 className="heading-primary mt-40 mb-40">Contact Person</h1>
        <div>
          <button
            type="button"
            className="btn-outline-green mr-20"
            onClick={addScriptsHandler}
          >
            <FaPlusCircle className="btn-icon-small" />
            Add Contact
          </button>
        </div>
      </div>
      {Object.keys(contacts).map((key: string) => (
        <div className="wrapper-section">
          <div className="wrapper-section__content">
            <div className="row">
              <div className="col-4">
                <div className="field video" style={{ position: 'relative' }}>
                  <label>Name</label>
                  <FaUser
                    className="video__icon"
                    style={{ transform: 'translate(2rem, 1.7rem)' }}
                  />
                  <input
                    type="text"
                    className="custom-input video__input mt--30"
                    placeholder="Name"
                    name="name"
                    disabled={contacts[key].isDisabled}
                    value={contacts[key].name}
                    onChange={(e) => handleChangeInput(key, e)}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="field video" style={{ position: 'relative' }}>
                  <label>Whats App</label>
                  <FaWhatsapp
                    className="video__icon"
                    style={{ transform: 'translate(2rem, 1.7rem)' }}
                  />
                  <input
                    type="text"
                    className="custom-input video__input  mt--30"
                    placeholder="Whatsapp Number"
                    name="whatsapp"
                    disabled={contacts[key].isDisabled}
                    value={contacts[key].whatsapp}
                    onChange={(e) => handleChangeInput(key, e)}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="field video" style={{ position: 'relative' }}>
                  <label>Company Logo</label>
                  <FaUpload
                    className="video__icon"
                    style={{ transform: 'translate(2rem, 1.7rem)' }}
                  />
                  <input
                    type="file"
                    className="custom-input video__input mt--30"
                    placeholder="Name"
                    disabled={contacts[key].isDisabled}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-20">
              <div className="col-4">
                <div className="field video" style={{ position: 'relative' }}>
                  <label>Email</label>
                  <FaMailBulk
                    className="video__icon"
                    style={{ transform: 'translate(2rem, 1.7rem)' }}
                  />
                  <input
                    type="text"
                    className="custom-input video__input mt--30"
                    placeholder="Email Address"
                    name="email"
                    disabled={contacts[key].isDisabled}
                    value={contacts[key].email}
                    onChange={(e) => handleChangeInput(key, e)}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="field video" style={{ position: 'relative' }}>
                  <label>Address</label>
                  <FaLocationArrow
                    className="video__icon"
                    style={{ transform: 'translate(2rem, 3rem)' }}
                  />
                  <textarea
                    className="custom-input video__input mt--30"
                    placeholder="Enter Address"
                    name="address"
                    disabled={contacts[key].isDisabled}
                    value={contacts[key].address}
                    onChange={(e) => handleChangeInput(key, e)}
                  />
                </div>
              </div>
              <div className="col-4 flex">
                <div className="center">
                  <label htmlFor={key} className="custom-switch">
                    <input
                      type="checkbox"
                      id={key}
                      name="isPublished"
                      disabled={contacts[key].isDisabled}
                      checked={contacts[key].isPublished}
                      onChange={(e) => handleChangeInput(key, e)}
                    />
                    <span>&nbsp;</span>
                  </label>
                  <span
                    className="table__icon menu"
                    style={{ marginLeft: '3rem', visibility: 'visible' }}
                  >
                    <FaEllipsisH />
                    <div className="table__action_menu">
                      <button
                        className="big-icon"
                        onClick={() => deleteHandler(key)}
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="big-icon"
                        onClick={
                          contacts[key].isDisabled
                            ? (e) => editHandler(key)
                            : (e) => saveHandler(key)
                        }
                      >
                        {contacts[key].isDisabled ? <FaPen /> : <FaSave />}
                      </button>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactPerson;
