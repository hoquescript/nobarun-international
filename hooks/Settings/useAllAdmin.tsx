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

  // const admins = {};
  // if (data) {
  //   data.getAllAccounts.forEach((admin) => {
  //     admins[admin.id] = {
  //       fullName: admin.name,
  //       whatsapp: admin.whatsAppNumber,
  //       logo: admin.companyLogo,
  //       email: admin.email,
  //       address: admin.address,
  //       isPublished: admin.isPublished,
  //       isDisabled: true,
  //     };
  //   });
  // }
  console.log(admins);
  return admins;
};

export default useAllAdmin;
