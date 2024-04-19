import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';
import {
  FaUser,
  FaWhatsapp,
  FaMailBulk,
  FaHome,
  FaLocationArrow,
  FaSave,
  FaPlus,
  FaTimes,
} from 'react-icons/fa';
import { v4 as uuid } from 'uuid';
import { gql, useMutation } from '@apollo/client';

import FileButton from '../../../components/controls/file';
import Togglebar from '../../../components/controls/togglebar';
import Textfield from '../../../components/controls/textfield';
import Toolbar from '../../../components/shared/Toolbar';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../../hooks/useTypedSelector';
import {
  resetMediaSelection,
  selectContactImage,
  setContactImage,
} from '../../../store/slices/ui';
import Textarea from '../../../components/controls/textarea';
import OfficeAmenities, {
  IAmenities,
} from '../../../components/settings/Ammenities';
import useContactPersonById from '../../../hooks/Settings/useContactPersonById';
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

const defaultValues = {
  name: '',
  whatsapp: '',
  email: '',
  address: '',
  maps: '',
};

const ContactPersonPage = () => {
  const alert = useAlert();
  const router = useRouter();
  const contactPersonId = router.query.contactPersonId;

  const [amenities, setAmenities] = useState<IAmenities>({
    [uuid()]: {
      title: '',
      notes: '',
      isPublished: true,
      isDisabled: false,
    },
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [page, setPage] = useState('');
  const [postSectionKey, setPostSectionKey] = useState('');
  const dispatch = useTypedDispatch();

  const media = useTypedSelector((state) => state.ui.contactLogoMedia);
  const amenitiesMedia = useTypedSelector((state) => state.ui.contactsMedia);

  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const [createContact, createState] = useMutation(CREATE_CONTACT_PERSON);
  const [editContact, editState] = useMutation(EDIT_CONTACT_PERSON);

  const onSubmit = async (data) => {
    const amenitiesList: any = [];
    Object.keys(amenities).map((key) => {
      const amenity = amenities[key];
      amenitiesList.push({
        title: amenity.title,
        notes: amenity.notes,
        image: amenitiesMedia[key]?.images[0],
        isPublished: amenity.isPublished,
      });
    });
    const contact = {
      name: data.name,
      whatsAppNumber: data.whatsapp,
      email: data.email,
      address: data.address,
      maps: getMapsSrc(data.maps),
      isPublished: data.isPublished,
      companyLogo: media.images[0],
      amenities: amenitiesList,
    };
    console.log(contact);
    if (isEditMode) {
      await editContact({
        variables: {
          data: {
            editId: contactPersonId,
            editableObject: contact,
          },
        },
      });
      if (!editState.error) {
        alert.info('Edited Contact Successfully');
      } else {
        alert.error(editState.error.message);
      }
    } else {
      try {
        await createContact({
          variables: {
            data: contact,
          },
        });
        if (!createState.error) {
          alert.success('Saved Contact Successfully');
          formReset();
        } else {
          alert.error(createState.error.message);
        }
      } catch (error: any) {
        if (error.message) {
          alert.error(error.message);
        } else {
          alert.success('Saved Contact Successfully');
        }
      }
    }
  };
  const handleError = () => {};
  const formReset = () => {
    methods.reset(defaultValues);
    dispatch(resetMediaSelection());
    setAmenities({
      [uuid()]: {
        title: '',
        notes: '',
        isPublished: true,
        isDisabled: false,
      },
    });
  };

  useEffect(() => {
    if (contactPersonId !== 'add' && contactPersonId) {
      setIsEditMode(true);
      console.log(contactPersonId);
      useContactPersonById(contactPersonId).then((data: any) => {
        if (data) {
          methods.reset(data?.contact);
          setAmenities(data?.amenities);
          dispatch(
            setContactImage({
              contactLogoMedia: data?.contactLogoMedia,
              contactsMedia: data?.amenitiesMedia,
            }),
          );
        }
      });
    }
  }, [router]);

  const selectImageHandler = (imageSrc) => {
    dispatch(selectContactImage({ src: imageSrc, page, key: postSectionKey }));
  };

  return (
    <div className="container center">
      <Toolbar imageSelector={selectImageHandler} />
      <FormProvider {...methods}>
        <div
          className="main__content__header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 className="heading-primary">Add Contact Person</h2>
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
                router.push('/product/categories/add');
              }}
            >
              <FaPlus />
            </button>
            <button
              type="button"
              className="btn-icon-white ml-20"
              onClick={() => router.push('/product/categories')}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="wrapper-section mt-60">
          <div className="wrapper-section__content">
            <div className="row">
              <div className="col-4">
                <Textfield
                  name="name"
                  label="Name"
                  placeholder="Name"
                  className="video"
                  iconAdornment={
                    <FaUser
                      className="video__icon"
                      style={{
                        transform: 'translate(2rem, 4.8rem)',
                        position: 'absolute',
                      }}
                    />
                  }
                />
              </div>
              <div className="col-4">
                <Textfield
                  name="whatsapp"
                  label="Whats App"
                  placeholder="Whatsapp Number"
                  className="video"
                  iconAdornment={
                    <FaWhatsapp
                      className="video__icon"
                      style={{
                        transform: 'translate(2rem, 4.8rem)',
                        position: 'absolute',
                      }}
                    />
                  }
                />
              </div>
              <div className="col-4">
                <Textfield
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  label="Email"
                  className="video"
                  iconAdornment={
                    <FaMailBulk
                      className="video__icon"
                      style={{
                        transform: 'translate(2rem, 4.8rem)',
                        position: 'absolute',
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="row mt-20">
              <div className="col-4">
                <Textarea
                  name="address"
                  placeholder="Please Enter the Contact Person's Resident/Office Address"
                  label="Address"
                  className="video"
                  iconAdornment={
                    <FaHome
                      className="video__icon"
                      style={{
                        transform: 'translate(2rem, 5.2rem)',
                        position: 'absolute',
                      }}
                    />
                  }
                />
              </div>
              <div className="col-4">
                <Textarea
                  placeholder="Please Enter the Google Maps Embedded HTML Tag"
                  name="maps"
                  label="Maps"
                  className="video"
                  iconAdornment={
                    <FaLocationArrow
                      className="video__icon"
                      style={{
                        transform: 'translate(2rem, 5.5rem)',
                        position: 'absolute',
                      }}
                    />
                  }
                />
              </div>
              <div className="col-2">
                <div className={`field ml-30`}>
                  <label>Upload Media</label>
                  <FileButton page="contactLogo" showMedia setPage={setPage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
      <OfficeAmenities
        stocks={amenities}
        setStocks={setAmenities}
        setPage={setPage}
        postSectionKey={postSectionKey}
        setPostSectionKey={setPostSectionKey}
      />
    </div>
  );
};

export default ContactPersonPage;
