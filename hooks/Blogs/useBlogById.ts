import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_BLOG_BY_ID = gql`
  query getBlogById($id: String!) {
    getASingleBlog(blogId: $id) {
      id
      blogTitle
      relatedProduct
      contactPerson
      featured
      images
      videos
      category
      isFeatured
      isPublished
      sections {
        id
        title
        content
        images
        videos
      }
      tags
    }
  }
`;

const useBlogById = async (catid) => {
  const data = await Client.request(GET_BLOG_BY_ID, { id: catid });
  const blogById = data.getASingleBlog;
  const media = {};
  const contents = {};
  blogById.sections.forEach((section) => {
    media[section.id] = {
      images: section.images,
      videos: section.videos,
    };
    contents[section.id] = {
      title: section.title,
      content: section.content,
    };
  });
  const blog = {
    mainContent: {
      blogTitle: blogById.blogTitle,
      isPublished: blogById.isPublished,
      category: blogById.category,
      relatedProduct: blogById.relatedProduct,
      contactPerson: blogById.contactPerson,
      isFeatured: blogById.isFeatured,
    },
    main: {
      featured: blogById.featured,
      images: blogById.images,
      videos: blogById.videos,
    },
    postSection: {
      media,
      contents,
    },
    tags: blogById.tags,
  };
  return blog;
};

export default useBlogById;
