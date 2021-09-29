import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_ADMINS = gql`
  query {
    getAllTheUsers {
      id
      displayName
      address
      address
      lastName
      firstName
      email
      notes
      number
      location
    }
  }
`;

const useAllAdmin = async (token) => {
  const requestHeaders = {
    authorization: `Bearer ${token}`,
  };
  if (token) {
    const data = await Client.request(GET_ALL_ADMINS, {}, requestHeaders);

    const admins = data.getAllTheUsers.map((query) => ({
      id: query.id,
      fullName: query.firstName + ' ' + query.lastName,
      email: query.email,
      phone: query.number,
      title: query.displayName,
      role: 'Superuser',
    }));
    return admins;
  } else return [];
};

export default useAllAdmin;
