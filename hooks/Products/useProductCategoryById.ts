import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_PRODUCT_BY_ID = gql`
  query getCategoryById($id: String!) {
    getCategoryById(categoryId: $id) {
      _id
      id
      name
      description
      image
      parentCategory
      children
      slug
      isPublished
    }
  }
`;

const useProductCategoryById = async (fid, token) => {
  const requestHeaders = {
    authorization: `Bearer ${token}`,
  };
  if (token) {
    const data = await Client.request(
      GET_PRODUCT_BY_ID,
      { id: fid },
      requestHeaders,
    );
    const categoryById = data.getBlogCategoryById;
    const category = {
      id: categoryById.id,
      name: categoryById.name,
      description: categoryById.description,
      image: categoryById.image,
      parentCategory: categoryById.parentCategory,
      slug: categoryById.slug,
      isPublished: categoryById.isPublished,
    };
    return category;
  } else return {};
};

export default useProductCategoryById;
