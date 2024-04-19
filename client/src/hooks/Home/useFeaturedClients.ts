import { gql } from 'graphql-request';
import Client from '../../config/GraphQLRequest';

const GET_FEATURED_CLIENT = gql`
  query getFeaturedClients {
    getAllFeaturedClients {
      id
      title: clientName
      imgUrl: logo
    }
  }
`;

const useAllFeaturedClients = async () => {
  const data = await Client.request(GET_FEATURED_CLIENT);
  return data.getAllFeaturedClients;
};

export default useAllFeaturedClients;
