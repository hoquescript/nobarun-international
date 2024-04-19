import { gql } from 'graphql-request';
import Client from '../config/GraphQLRequest';

const GET_PRODUCT_BY_SEARCH = gql`
  query GetSearchResults($keyword: String!) {
    searchProductByName(key: $keyword) {
      title
      slug
      featuredImage
      reviewCount
      ratingAvg
    }
  }
`;

const useProductSearch = async (keyword) => {
  try {
    console.log(keyword);
    const data = await Client.request(GET_PRODUCT_BY_SEARCH, { keyword });
    return data.searchProductByName;
  }
  catch (e) {
    console.log(e)
  }
};

export default useProductSearch;
