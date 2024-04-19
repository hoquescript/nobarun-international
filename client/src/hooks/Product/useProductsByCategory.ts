import { gql } from 'graphql-request';
import Client from '../../config/GraphQLRequest';

const GET_CATEGORY_WISE_PRODUCT = gql`
  query getPopulatedProductByCategorySlug($slug: String!) {
    getPopulatedProductByCategorySlug(CategorySulg: $slug) {
      name
      description
      productData {
        productData {
          product {
            id
            slug
            productName
            discount
            featured
            stockStatus {
              title
            }
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
    getCategoriesForClient
    getAllTheStockStatus {
      title
      isPublished
    }
  }
`;

const useProductsByCategory = async (slug) => {
  const data = await Client.request(GET_CATEGORY_WISE_PRODUCT, { slug });
  // const products = data.getPopulatedProductByCategorySlug;
  return {
    categories: JSON.parse(data?.getCategoriesForClient),
    categoryName: data?.getPopulatedProductByCategorySlug?.name,
    categoryDescription: data?.getPopulatedProductByCategorySlug?.description,
    products: data?.getPopulatedProductByCategorySlug?.productData,
    stockStatus: data?.getAllTheStockStatus,
  };
};

export default useProductsByCategory;
