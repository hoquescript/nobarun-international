import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useAlert } from 'react-alert';
import { gql, useMutation } from '@apollo/client';
import {
  FaEllipsisH,
  FaLocationArrow,
  FaMailBulk,
  FaPen,
  FaPlusCircle,
  FaSave,
  FaTrash,
  FaHome,
  FaUser,
  FaWhatsapp,
} from 'react-icons/fa';
import useAllContactPerson from '../../../hooks/Settings/useAllContactPerson';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Modal from '../../../components/shared/Modal';
import FileButton from '../../../components/controls/file';
import Toolbar from '../../../components/shared/Toolbar';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../../hooks/useTypedSelector';
import { selectContactImage, setContactImage } from '../../../store/slices/ui';
import getMapsSrc from '../../../helpers/getMapsSrc';

const CREATE_CONTACT_PERSON = gql`
  mutation addNewContactPerson($data: CreateNewContactPerson!) {
    createNewContactPerson(data: $data) {
      name
    }
  }
`;
const EDIT_CONTACT_PERSON = gql`
  mutation editContactPerson($data: EditContactPerson!) {
    editContactPerson(data: $data)
  }
`;
const DELETE_CONTACT_PERSON = gql`
  mutation deleteContactPerson($id: String!) {
    deleteContactPersonById(contactPersonId: $id)
  }
`;

const ContactPerson = () => {
  const alert = useAlert();
  const [postSectionKey, setPostSectionKey] = useState('');

  const [contacts, setContacts] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteKey, setDeleteKey] = useState('');

  const media = useTypedSelector((state) => state.ui.contactsMedia);

  const [createContact, createState] = useMutation(CREATE_CONTACT_PERSON);
  const [editContact, editState] = useMutation(EDIT_CONTACT_PERSON);
  const [deleteContact, deleteState] = useMutation(DELETE_CONTACT_PERSON);

  useEffect(() => {
    useAllContactPerson().then((data) => {
      setContacts(data.persons);
      dispatch(setContactImage(data.media));
    });
  }, []);

  const addContactHandler = () => {
    setContacts({
      [uuid()]: {
        name: '',
        whatsapp: '',
        logo: '',
        email: '',
        address: '',
        maps: '',
        isPublished: true,
        isDisabled: false,
        isNewContact: true,
      },
      ...contacts,
    });
  };

  const saveHandler = async (id: string) => {
    const contact = contacts[id];
    contact.isDisabled = true;

    console.log(contact);
    const contactPerson = {
      name: contact.name,
      whatsAppNumber: contact.whatsapp,
      email: contact.email,
      address: contact.address,
      maps: contact.maps,
      isPublished: contact.isPublished,
      companyLogo: media[id].images[0],
    };

    const editContactPerson = {
      editId: id,
      editableObject: contactPerson,
    };

    if (contact.isNewContact) {
      await createContact({
        variables: {
          data: contactPerson,
        },
      });
      if (!createState.error) {
        alert.success('Saved Contact Successfully');
      } else {
        alert.error(createState.error.message);
      }
    } else {
      await editContact({
        variables: {
          data: editContactPerson,
        },
      });
      if (!editState.error) {
        alert.info('Edited Contact Successfully');
      } else {
        alert.error(editState.error.message);
      }
    }
    setContacts({ ...contacts, [id]: contact });
  };

  const editHandler = (id: string) => {
    const contact = contacts[id];
    contact.isDisabled = false;
    setContacts({ ...contacts, [id]: contact });
  };

  const openModal = (key) => {
    setShowDeleteModal(true);
    setDeleteKey(key);
  };

  const deleteHandler = async (id: string) => {
    const newContacts = Object.keys(contacts).reduce((object, key) => {
      if (key !== id) {
        object[key] = contacts[key];
      }
      return object;
    }, {});
    try {
      if (!contacts[id].isNewContact) {
        await deleteContact({
          variables: {
            id,
          },
        });

        if (!deleteState.error) {
          alert.info('Deleted Contact Successfully');
        } else {
          alert.error(deleteState.error.message);
        }
      }
    } catch (err) {
      if (err) {
        console.log(err);
        alert.error(err);
      }
    }
    // @ts-ignore
    setContacts(newContacts);
  };

  const handleChangeInput = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | 'file',
    url?: string,
  ) => {
    // @ts-ignore
    const contact = contacts[id];
    if (event === 'file') {
      contact.logo = url;
    } else {
      // @ts-ignore
      const { name, value, checked } = event.target;
      if (name === 'isPublished') {
        contact[name] = checked;
      } else if (name === 'maps') {
        contact[name] = getMapsSrc(value);
        console.log(getMapsSrc(value));
      } else {
        // @ts-ignore
        contact[name] = value;
      }
    }
    setContacts({ ...contacts, [id]: contact });
  };

  const dispatch = useTypedDispatch();
  const selectImageHandler = (imageSrc) => {
    dispatch(selectContactImage({ src: imageSrc, key: postSectionKey }));
  };
  return (
    <div className="container center">
      <Toolbar imageSelector={selectImageHandler} />
      <Modal
        title="Contact Person"
        modalIsOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        confirmHandler={() => deleteHandler(deleteKey)}
      />
      <div className="flex sb mt-40 mb-20">
        <h1 className="heading-primary mt-40 mb-40">Contact Person</h1>
        <div>
          <button
            type="button"
            className="btn-outline-green mr-20"
            onClick={addContactHandler}
          >
            <FaPlusCircle className="btn-icon-small" />
            Add Contact
          </button>
        </div>
      </div>
      {Object.keys(contacts).map((key: string) => (
        <div className="wrapper-section" key={key}>
          <div className="wrapper-section__content">
            <div className="row">
              <div className="col-4">
                <div className="field video" style={{ position: 'relative' }}>
                  <label>Name</label>
                  <FaUser
                    className="video__icon"
                    style={{ transform: 'translate(2rem, 1.1rem)' }}
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
                    style={{ transform: 'translate(2rem, 1.1rem)' }}
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
                  <label>Email</label>
                  <FaMailBulk
                    className="video__icon"
                    style={{ transform: 'translate(2rem, 1.1rem)' }}
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
            </div>
            <div className="row mt-20">
              <div className="col-4">
                <div className="field video" style={{ position: 'relative' }}>
                  <label>Address</label>
                  <FaHome
                    className="video__icon"
                    style={{ transform: 'translate(2rem, 3rem)' }}
                  />
                  <textarea
                    className="custom-input video__input mt--30"
                    placeholder="Please Enter the Contact Person's Resident/Office Address"
                    name="address"
                    disabled={contacts[key].isDisabled}
                    value={contacts[key].address}
                    onChange={(e) => handleChangeInput(key, e)}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="field video" style={{ position: 'relative' }}>
                  <label>Maps</label>
                  <FaLocationArrow
                    className="video__icon"
                    style={{ transform: 'translate(2rem, 3rem)' }}
                  />
                  <textarea
                    className="custom-input video__input mt--30"
                    placeholder="Please Enter the Google Maps Embedded HTML Tag"
                    name="maps"
                    disabled={contacts[key].isDisabled}
                    value={contacts[key].maps}
                    onChange={(e) => handleChangeInput(key, e)}
                  />
                </div>
              </div>
              <div className="col-2">
                <div className={`field ml-60`}>
                  <label>Upload Media</label>
                  <FileButton
                    page="contact"
                    showMedia
                    postKey={key}
                    setPostSectionKey={setPostSectionKey}
                  />
                </div>
              </div>
              <div className="col-2 flex">
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
                        onClick={() => openModal(key)}
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

export default ContactPerson;
