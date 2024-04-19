import { gql } from 'graphql-request';
import Client from '../../config/GraphQLRequest';

const GET_PRODUCTS_BY_TAG = gql`
  query GetProductsByTag($tag: String!) {
    searchProductByTag(tag: $tag) {
      name
      slug
      category {
        name
        icon
      }
      noOfRating
      avgReview
      featuredImage
    }
    getCategoriesForClient
    getAllTheStockStatus {
      title
      isPublished
    }
  }
`;

const useProductsByTag = async (tag) => {
  const data = await Client.request(GET_PRODUCTS_BY_TAG, { tag });
  return {
    products: data.searchProductByTag,
    stocks: data.getAllTheStockStatus,
    categories: JSON.parse(data?.getCategoriesForClient),
  };
};

export default useProductsByTag;
