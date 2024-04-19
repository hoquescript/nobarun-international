import { gql } from 'graphql-request';
import Client from '../config/GraphQLRequest';

const GET_ALL_CLIENT_BY_CATEGORY = gql`
  query {
    getClientsByClientCategory {
      categoryName
      clients {
        logo
        clientName
      }
    }
  }
`;

const useAllClientsByCategory = async () => {
  const data = await Client.request(GET_ALL_CLIENT_BY_CATEGORY);
  return data.getClientsByClientCategory;
};

export default useAllClientsByCategory;
