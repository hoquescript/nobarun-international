import { gql } from 'graphql-request';
import Client from '../config/GraphQLRequest';

const GET_PRODUCTS_COUNT = gql`
  query getTotalProductCount {
    getTotalProductCount
  }
`;

const useProductCount = async () => {
  const data = await Client.request(GET_PRODUCTS_COUNT);
  return data.getTotalProductCount;
};

export default useProductCount;
