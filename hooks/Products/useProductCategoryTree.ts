import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_CATEGORY = gql`
  query GetCategoryTree {
    getCategories
  }
`;

const useProductCategoryTree = async () => {
  const data = await Client.request(GET_ALL_CATEGORY);
  // console.log(data);
  // const admins = data.getAllTheUsers.map((query) => ({
  //   id: query.id,
  //   fullName: query.firstName + ' ' + query.lastName,
  //   email: query.email,
  //   phone: query.number,
  //   title: query.displayName,
  //   role: 'Superuser',
  // }));

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
