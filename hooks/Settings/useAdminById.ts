import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ADMIN_BY_ID = gql`
  query getAdminById($id: String!) {
    getSingleAdminById(adminId: $id) {
      firstName
      lastName
      displayName
      address
      email
      number
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
      number: accounts.number,
      password: '',
      confirmPassword: '',
      sendMail: false,
    };
    return account;
  } else return {};
};

export default useAdminById;
