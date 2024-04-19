import { gql } from 'graphql-request';
import Client from '../../config/GraphQLRequest';

const GET_ALL_BLOGS = gql`
  query getAllBlogs {
    getAllTheBlog {
      id
      slug
      featured
      postTitle: blogTitle
      description: title
      populatedCategory {
        category: name
      }
    }
  }
`;

const useAllBlogs = async () => {
  const data = await Client.request(GET_ALL_BLOGS);
  return data.getAllTheBlog.map((blog) => ({
    id: blog.id,
    slug: blog.slug,
    postTitle: blog.postTitle,
    description: blog.description,
    image: blog.featured,
    category: blog.populatedCategory ? blog.populatedCategory.category : '',
  }));
};

export default useAllBlogs;
