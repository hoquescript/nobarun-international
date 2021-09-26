import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_BLOGS = gql`
  query getAllBlogs {
    getAllTheBlog {
      id
      postTitle: title
      body
      contact: type
      category
      isPublished
      author: createdBy
    }
  }
`;

const useAllBlogCategories = async () => {
  const data = await Client.request(GET_ALL_BLOGS);
  return data.getAllTheBlog.map((blog) => ({
    postTitle: blog.postTitle,
    contact: 'Informative',
    category: blog.category,
    isPublished: blog.isPublished,
    publishedOn: '20th Jan, 2021',
    author: 'Nobarun',
  }));
};

export default useAllBlogCategories;
