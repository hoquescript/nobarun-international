import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ADMIN_BY_ID = gql`
  query getAdminById($id: String!) {
    getSingleAdminById(adminId: $id) {
      firstName
      lastName
      email
      number
      displayName
    }
  }
`;

const useAdminById = async (aid) => {
  console.log(aid);
  const data = await Client.request(GET_ADMIN_BY_ID, { id: aid });
  console.log(data);
  // const admins = data.getAllTheUsers.map((query) => ({
  //   id: query.id,
  //   fullName: query.firstName + ' ' + query.lastName,
  //   email: query.email,
  //   phone: query.number,
  //   title: query.displayName,
  //   role: 'Superuser',
  // }));

  return data.getSingleAdminById;
};

export default useAdminById;
