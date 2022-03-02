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
          image: featured
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
  try {
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
  }
  catch (e) {
    console.log(e);
    return []
  }
};

export default useAllProducts;
