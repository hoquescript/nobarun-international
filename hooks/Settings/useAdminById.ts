import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ADMIN_BY_ID = gql`
  query getAdminById($id: String!) {
    getSingleAdminById(adminId: $id) {
      firstName
      lastName
      displayName
      image
      address
      email
      number
      notes
      permission {
        Appearance {
          delete
          edit
          view
        }
        Blogs {
          delete
          edit
          view
        }
        Dashboard {
          delete
          edit
          view
        }
        Product {
          delete
          edit
          view
        }
        Settings {
          delete
          edit
          view
        }
        Review {
          delete
          edit
          view
        }
      }
    }
  }
`;

const useAdminById = async (aid, token) => {
  const requestHeaders = {
    authorization: `Bearer ${token}`,
  };
  if (token) {
    const data = await Client.request(
      GET_ADMIN_BY_ID,
      { id: aid },
      requestHeaders,
    );
    const accounts = data.getSingleAdminById;
    const account = {
      firstName: accounts.firstName,
      lastName: accounts.lastName,
      displayName: accounts.displayName,
      address: accounts.address,
      email: accounts.email,
      image: accounts.image,
      number: accounts.number,
      notes: accounts.notes,
      password: 'Hello1997',
      confirmPassword: 'Hello1997',
      sendMail: false,
    };
    return { account, permission: accounts.permission };
  } else return {};
};

export default useAdminById;
