import { gql } from 'graphql-request';
import Client from '../config/GraphqlClient';

const GET_ROOT_QUERY = gql`
  query {
    getRootData {
      totalProducts
      totalEnquery
      totalBlogPost
      totalReviews
      topProductEnquery {
        product {
          id
          productName
          title
        }
        reviewCount
        ratingAverage
      }
      recentProduct {
        product {
          id
          productName
          title
        }
        reviewCount
        ratingAverage
      }
      recentReviews {
        product {
          id
          productName
          title
        }
        reviewCount
        ratingAverage
      }
    }
  }
`;

const useRootQuery = async (token) => {
  const requestHeaders = {
    authorization: `Bearer ${token}`,
  };
  if (token) {
    const data = await Client.request(GET_ROOT_QUERY, {}, requestHeaders);
    const dashboard = data.getRootData;
    return {
      summary: {
        totalProducts: dashboard.totalProducts,
        totalQueries: dashboard.totalEnquery,
        totalPosts: dashboard.totalBlogPost,
        totalReviews: dashboard.totalReviews,
      },
      enquiries: dashboard.topProductEnquery,
      recentProducts: dashboard.recentProduct,
      recentReviews: dashboard.recentReviews,
    };
  } else return {};
};

export default useRootQuery;
