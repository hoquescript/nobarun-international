import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    getAllCategoriesWithoutParent {
      id
      value: name
    }
  }
`;

const useAllCategories = async () => {
  const data = await Client.request(GET_ALL_CATEGORIES);
  return data.getAllCategoriesWithoutParent;
};

export default useAllCategories;
