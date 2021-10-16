import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_CLIENT_CATEGORY = gql`
  query getAllClientCategory {
    getAllClients {
      id: relatedCategory
      value: relatedCategory
    }
  }
`;

const useAllClientCategory = async () => {
  const data = await Client.request(GET_ALL_CLIENT_CATEGORY);
  return data.getAllClients;
};

export default useAllClientCategory;
