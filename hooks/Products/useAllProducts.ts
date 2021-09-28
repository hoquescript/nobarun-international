import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    getAllTheProducts {
      id
      productName
      category
      specification
      price
      productCode
      images
      isPublished
    }
  }
`;

const useAllProducts = async () => {
  const data = await Client.request(GET_ALL_PRODUCTS);
  return data.getAllTheProducts;
};

export default useAllProducts;
