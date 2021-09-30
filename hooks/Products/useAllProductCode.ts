import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_PRODUCT_CODE = gql`
  query getAllProductCode {
    getAllTheProducts {
      id: productCode
      value: productCode
    }
  }
`;

const useAllProductCode = async () => {
  const data = await Client.request(GET_ALL_PRODUCT_CODE);
  return data.getAllTheProducts;
};

export default useAllProductCode;
