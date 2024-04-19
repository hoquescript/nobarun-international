import { gql } from 'graphql-request';
import Client from '../../config/GraphQLRequest';

const GET_BLOG_CATEGORIES_TREE = gql`
  query getBlogCategoriesTree {
    getBlogCategories
  }
`;

const useBlogCategoriesTree = async () => {
  const data = await Client.request(GET_BLOG_CATEGORIES_TREE);

  const categories = JSON.parse(data?.getBlogCategories).map((category) => ({
    _id: category._id,
    id: category.id,
    name: category.name,
    description: category.description,
    // image: category.image,
    slug: category.slug,
    children: category.children,
    isPublished: false,
  }));

  return categories;
};

export default useBlogCategoriesTree;
