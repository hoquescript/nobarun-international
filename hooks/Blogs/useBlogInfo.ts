import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_BLOG_INFO = gql`
  query blogInfo {
    getAllTheContactPersons {
      id
      value: name
    }
    getAllTheCollection {
      id
      value: name
    }
    getAllBlogCategoriesWithoutParent {
      id
      value: name
    }
  }
`;

const useBlogInfo = async () => {
  const data = await Client.request(GET_ALL_BLOG_INFO);
  return {
    categories: data.getAllBlogCategoriesWithoutParent,
    contacts: data.getAllTheContactPersons,
    collections: data.getAllTheCollection,
  };
};

export default useBlogInfo;
