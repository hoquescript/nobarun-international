import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    getAllThePopulatedProducts {
      productData {
        product {
          id
          productName
          slug
          populatedCategory {
            name
          }
          description: title
          price
          productCode
          images
          viewCount
          isPublished
          createdAt
          author {
            displayName
          }
          contactPerson {
            name
          }
        }
        reviewCount
        ratingAverage
      }
    }
  }
`;

const useAllProducts = async () => {
  const data = await Client.request(GET_ALL_PRODUCTS);
  return data.getAllThePopulatedProducts.map(({ productData }) => ({
    ...productData.product,
    category: productData.product.populatedCategory
      ? productData.product.populatedCategory.name
      : '',
    contactPerson: productData.product.contactPerson
      ? productData.product.contactPerson.name
      : '',
    author: productData.product.author
      ? productData.product.author.displayName
      : '',
    noOfReview: productData.reviewCount,
    avgRating: productData.ratingAverage,
  }));
};

export default useAllProducts;
