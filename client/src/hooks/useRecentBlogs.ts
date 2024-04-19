import { gql } from 'graphql-request';
import Client from '../config/GraphQLRequest';

const GET_RECENT_BLOGS = gql`
  query getRecentBlogs {
    getSomeBlogs(limit: 4) {
      blogTitle
      slug
    }
  }
`;

const useRecentBlogs = async () => {
  const data = await Client.request(GET_RECENT_BLOGS);
  return data.getSomeBlogs;
};

export default useRecentBlogs;
