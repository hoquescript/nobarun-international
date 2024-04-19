import { gql } from 'graphql-request';
import Client from '../../config/GraphQLRequest';

const GET_ALL_FEATURED_CATEGORY = gql`
  query getAllFeaturedCategories {
    getAllFeaturedCategories {
      id: _id
      title: name
      slug
      imgUrl: featuredImage
    }
  }
`;

const useFeaturedCategories = async () => {
  const data = await Client.request(GET_ALL_FEATURED_CATEGORY);

  const categories = data?.getAllFeaturedCategories.map((category) => ({
    ...category,
    productUrl: `/category/${category.slug}`,
  }));

  return categories;
};

export default useFeaturedCategories;
