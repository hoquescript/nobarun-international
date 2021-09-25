import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_ADMINS = gql`
  query getAllAccounts {
    getAllTheUsers {
      id
      firstName
      lastName
      email
      number
      displayName
    }
  }
`;

const useAllAdmin = async () => {
  const data = await Client.request(GET_ALL_ADMINS);

  const admins = data.getAllTheUsers.map((query) => ({
    id: query.id,
    fullName: query.firstName + ' ' + query.lastName,
    email: query.email,
    phone: query.number,
    title: query.displayName,
    role: 'Superuser',
  }));

  return admins;
};

export default useAllAdmin;
