import { gql } from 'graphql-request';
import Client from '../../config/GraphQLRequest';

const GET_COLLECTION_WISE_PRODUCT = gql`
  query getCollectionWiseProduct {
    getAllPopulatedCollection {
      name
      slug
      products {
        product {
          id: slug
          productName
          discount
          featured
          populatedCategory {
            name
            icon
          }
        }
        reviewCount
        ratingAverage
      }
    }
  }
`;

const useCollectionWiseProduct = async () => {
  const data = await Client.request(GET_COLLECTION_WISE_PRODUCT);

  return data.getAllPopulatedCollection;
};

export default useCollectionWiseProduct;
