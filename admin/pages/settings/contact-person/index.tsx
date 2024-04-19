import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { gql, useMutation } from '@apollo/client';
import { FaPlusCircle } from 'react-icons/fa';
import useAllContactPerson from '../../../hooks/Settings/useAllContactPerson';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import styles from '../../../styles/pages/query-report.module.scss';
import Toolbar from '../../../components/shared/Toolbar';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../../hooks/useTypedSelector';
import { selectContactImage, setContactImage } from '../../../store/slices/ui';
import Table from '../../../components/shared/Table';
import { CONTACT_COLUMNS } from '../../../data/ContactColumn';

const DELETE_CONTACT_PERSON = gql`
  mutation deleteContactPerson($id: String!) {
    deleteContactPersonById(contactPersonId: $id)
  }
`;

const ContactPerson = () => {
  const alert = useAlert();
  const [contacts, setContacts] = useState([]);
  const [deleteKey, setDeleteKey] = useState('');

  const [deleteContact, deleteState] = useMutation(DELETE_CONTACT_PERSON);

  useEffect(() => {
    useAllContactPerson().then((data) => {
      setContacts(data);
    });
  }, []);

  return (
    <div className={styles.query}>
      <div className="flex sb mt-40 mb-20">
        <h1 className="heading-primary mt-40 mb-40">Contact Person</h1>
        <div>
          <a
            href="/settings/contact-person/add"
            type="button"
            className="btn-outline-green mr-20"
          >
            <FaPlusCircle className="btn-icon-small" />
            Add Contact
          </a>
        </div>
      </div>
      <Table
        pageName="contact"
        columns={CONTACT_COLUMNS}
        data={contacts}
        deleteHandler={async (id, idx) => {
          const modifiedData = [...contacts];
          modifiedData.splice(idx, 1);
          setContacts(modifiedData);

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
        }}
      />
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
