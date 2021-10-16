import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_CLIENTS = gql`
  query getAllClients {
    getAllClients {
      id
      clientName
      logo
      categoryName: relatedCategory
      description
      isPublished
    }
  }
`;

const useAllClients = async () => {
  const data = await Client.request(GET_ALL_CLIENTS);
  return data.getAllClients;
};

export default useAllClients;
