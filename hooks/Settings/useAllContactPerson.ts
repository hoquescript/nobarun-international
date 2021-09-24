import React from 'react';
import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_CONTACT_PERSON = gql`
  query getAllTheContactPersons {
    getAllTheContactPersons {
      id
      name
      whatsAppNumber
      email
      address
      isPublished
      companyLogo
    }
  }
`;

const useAllContactPerson = async () => {
  const data = await Client.request(GET_ALL_CONTACT_PERSON);

  const persons = {};
  if (data) {
    data.getAllTheContactPersons.forEach((contact) => {
      persons[contact.id] = {
        name: contact.name,
        whatsapp: contact.whatsAppNumber,
        logo: contact.companyLogo,
        email: contact.email,
        address: contact.address,
        isPublished: contact.isPublished,
        isDisabled: true,
      };
    });
  }
  return persons;
};

export default useAllContactPerson;
