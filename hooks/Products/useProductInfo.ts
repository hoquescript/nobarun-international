import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_PRODUCT_INFO = gql`
  query productInfo {
    getAllTheProductSlugs
    getAllTheContactPersons {
      id
      value: name
    }
    getAllTheStockStatus {
      id
      value: title
    }
    getAllTheCollection {
      id
      value: name
    }
    getAllCategoriesWithoutParent {
      id
      value: name
    }
  }
`;

const useProductInfo = async () => {
  const data = await Client.request(GET_ALL_PRODUCT_INFO);
  return {
    slugs: JSON.parse(data.getAllTheProductSlugs),
    categories: data.getAllCategoriesWithoutParent,
    contacts: data.getAllTheContactPersons,
    stocks: data.getAllTheStockStatus,
    collections: data.getAllTheCollection,
  };
};

export default useProductInfo;
