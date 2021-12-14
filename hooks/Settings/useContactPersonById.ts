import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';
import { v4 as uuid } from 'uuid';

const GET_CONTACT_BY_ID = gql`
  query getAllTheContactPersons($id: String!) {
    getASingleContactPerson(contactPersonId: $id) {
      name
      whatsAppNumber
      email
      address
      maps
      isPublished
      companyLogo
      amenities {
        id
        title
        notes
        image
        isPublished
      }
    }
  }
`;

const useContactPersonById = async (contactPersonId) => {
  if (contactPersonId) {
    const response = await Client.request(GET_CONTACT_BY_ID, {
      id: contactPersonId,
    });

    const amenities = {};
    const amenitiesMedia = {};
    const data = response?.getASingleContactPerson;
    const contact = {
      name: data.name,
      whatsapp: data.whatsAppNumber,
      email: data.email,
      address: data.address,
      maps: data.maps,
      isPublished: data.isPublished,
    };
    const contactLogoMedia = {
      images: [data.companyLogo],
      videos: [],
    };
    data.amenities.forEach((amenity) => {
      amenities[amenity.id] = {
        title: amenity.title,
        notes: amenity.notes,
        isPublished: amenity.isPublished,
        isDisabled: true,
      };
      amenitiesMedia[amenity.id] = {
        images: [amenity.image || ''],
        videos: [],
      };
    });
    return { contact, contactLogoMedia, amenities, amenitiesMedia };
  }
};

export default useContactPersonById;
