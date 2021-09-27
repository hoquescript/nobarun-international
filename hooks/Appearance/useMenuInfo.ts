import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_MENUS_INFO = gql`
  query getPageInfo {
    getAllTheProducts {
      productName
      slug
    }
    getAllCategoriesWithoutParent {
      name
      slug
    }
    getAllTheCollection {
      name
      slug
    }
    getAllTheBlog {
      name: blogTitle
      slug: category
    }
  }
`;

const useMenuInfo = async () => {
  const data = await Client.request(GET_ALL_MENUS_INFO);
  return {
    products: data.getAllTheProducts,
    categories: data.getAllCategoriesWithoutParent,
    collections: data.getAllTheCollection,
    blogs: data.getAllTheBlog,
    // pages: data.getAllTheStockStatus,
  };
};

export default useMenuInfo;
