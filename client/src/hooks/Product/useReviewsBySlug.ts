import { gql } from 'graphql-request';
import Client from '../../config/GraphQLRequest';

const GET_REVIEWS_BY_PRODUCT_SLUG = gql`
  query GetAllReviewsByProductSlug($slug: String!) {
    getProductReviewComponentBySlug(sulg: $slug) {
      productTitle
      productCode
      price
      stockStatus
      featuredImage
      seoTitle
      keywords
      description
      summary {
        avgRating
        noOfReviews
      }
      details {
        title
        percent
      }
      reviews: populatedReviews {
        id
        title
        name
        rating
        createdAt
        reviewText
        featuredImage
        reviewMedia {
          images
          videos
        }
      }
      contact: populatedContatctPerson {
        companyLogo
        name
        whatsAppNumber
        email
        address
        maps
      }
    }
  }
`;

const useReviewsBySlug = async (slug) => {
  const data = await Client.request(GET_REVIEWS_BY_PRODUCT_SLUG, { slug });
  return data.getProductReviewComponentBySlug;
};

export default useReviewsBySlug;
