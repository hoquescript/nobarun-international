import { gql } from 'graphql-request';
import Client from '../../config/GraphQLRequest';

const GET_BLOG_BY_SLUG = gql`
  query GetBlogBySlug($slug: String!) {
    getBlogBySlug(slug: $slug) {
      blogTitle
      featured
      SeoTitle
      description: title
      contactPerson {
        companyLogo
        name
        whatsAppNumber
        email
        address
        maps
      }
      populatedCategory {
        name
      }
      sections {
        id
        title
        content
        images
      }
      tags
    }
  }
`;

const useBlogBySlug = async (slug) => {
  const data = await Client.request(GET_BLOG_BY_SLUG, {
    slug: decodeURI(slug),
  });

  const blog = data.getBlogBySlug;
  return blog;
};

export default useBlogBySlug;
