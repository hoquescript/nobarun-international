import { gql } from 'graphql-request';
import Client from '../../config/GraphQLRequest';

const GET_ALL_CATEGORY = gql`
  query GetCategoryTree {
    getCategoriesForClient
  }
`;

const useAllProductCategories = async () => {
  const data = await Client.request(GET_ALL_CATEGORY);

  const categories = JSON.parse(data?.getCategoriesForClient).map(
    (category) => ({
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      image: category.image,
      isFeatured: category.isFeatured,
      isPublished: category.isPublished,
      children: category.children,
    }),
  );

  return categories;
};

export default useAllProductCategories;
