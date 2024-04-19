import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_BLOG_CATEGORIES = gql`
  query getAllBlogCategories {
    getAllBlogCategoriesWithoutParent {
      id
      value: name
    }
  }
`;

const useAllBlogCategories = async () => {
  const data = await Client.request(GET_ALL_BLOG_CATEGORIES);
  return data.getAllBlogCategoriesWithoutParent;
};

export default useAllBlogCategories;
