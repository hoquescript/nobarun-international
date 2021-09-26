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
      permission {
        Appearance {
          delete
          edit
          view
        }
      }
    }
  }
`;

const useAllAdmin = async () => {
  const client = await createGraphQLRequestClient();
  const data = await client.request(GET_ALL_ADMINS);

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
function createGraphQLRequestClient() {
  throw new Error('Function not implemented.');
}
