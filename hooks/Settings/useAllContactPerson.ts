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
  const media = {};
  if (data) {
    data.getAllTheContactPersons.forEach((contact) => {
      persons[contact.id] = {
        name: contact.name,
        whatsapp: contact.whatsAppNumber,
        email: contact.email,
        address: contact.address,
        isPublished: contact.isPublished,
        isDisabled: true,
      };
      media[contact.id] = {
        images: [contact.companyLogo],
        videos: [],
      };
    });
  }
  return { persons, media };
};

export default useAllContactPerson;
