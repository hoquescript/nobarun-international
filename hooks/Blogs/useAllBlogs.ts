import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_BLOGS = gql`
  query getAllBlogs {
    getAllTheBlog {
      id
      postTitle: blogTitle
      contact: contactPerson {
        name
      }
      category: populatedCategory {
        name
      }
      isPublished
      author {
        displayName
      }
      createdAt
    }
  }
`;

const useAllBlogCategories = async () => {
  const data = await Client.request(GET_ALL_BLOGS);
  return data.getAllTheBlog.map((blog) => ({
    id: blog.id,
    postTitle: blog.postTitle,
    contact: blog.contact ? blog.contact.name : '',
    category: blog.category ? blog.category.name : '',
    isPublished: blog.isPublished,
    publishedOn: blog.createdAt,
    author: blog.author ? blog.author.displayName : '',
    createdAt: blog.createdAt,
  }));
};

export default useAllBlogCategories;
