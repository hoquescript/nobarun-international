import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_BLOG_CATEGORIES = gql`
  query getAllBlogCategories {
    getBlogCategories
  }
`;

const useAllBlogCategories = async () => {
  const data = await Client.request(GET_ALL_BLOG_CATEGORIES);
  // console.log(data);
  // const admins = data.getAllTheUsers.map((query) => ({
  //   id: query.id,
  //   fullName: query.firstName + ' ' + query.lastName,
  //   email: query.email,
  //   phone: query.number,
  //   title: query.displayName,
  //   role: 'Superuser',
  // }));

  const categories = JSON.parse(data?.getAllBlogCategories).map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    slug: category.slug,
    children: category.children,
  }));

  return categories;
};

export default useAllBlogCategories;
