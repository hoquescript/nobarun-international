import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_CATEGORIES = gql`
  query getAllProducts {
    getAllTheProducts {
      id
      productName
      category
      specification
      productCode
    }
  }
`;

const useAllCategories = async () => {
  const data = await Client.request(GET_ALL_CATEGORIES);
  return data.getAllCategoriesWithoutParent;
};

export default useAllCategories;
