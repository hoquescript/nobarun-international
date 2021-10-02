import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    getAllTheProducts {
      id
      productName
      populatedCategory {
        name
        _id
      }
      specification
      price
      productCode
      images
      isPublished
      createdAt
    }
  }
`;

const useAllProducts = async () => {
  const data = await Client.request(GET_ALL_PRODUCTS);
  return data.getAllTheProducts.map((product) => ({
    ...product,
    category: product.populatedCategory ? product.populatedCategory.name : '',
  }));
};

export default useAllProducts;
