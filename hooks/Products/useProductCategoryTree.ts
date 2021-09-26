import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_CATEGORY = gql`
  query GetCategoryTree {
    getCategories
  }
`;

const useProductCategoryTree = async () => {
  const data = await Client.request(GET_ALL_CATEGORY);

  const categories = JSON.parse(data?.getCategories).map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    slug: category.slug,
    children: category.children,
    isPublished: false,
  }));

  return categories;
};

export default useProductCategoryTree;
