import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_BLOG_BY_ID = gql`
  query getBlogById($id: String!) {
    getBlogCategoryById(categoryId: $id) {
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

const useBlogCategoryById = async (catid, token) => {
  const requestHeaders = {
    authorization: `Bearer ${token}`,
  };
  if (token) {
    const data = await Client.request(
      GET_BLOG_BY_ID,
      { id: catid },
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

export default useBlogCategoryById;
