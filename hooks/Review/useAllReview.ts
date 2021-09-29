import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_REVIEWS = gql`
  query getAllReviews {
    getAllReviews {
      id
      title
      name
      email
      rating
      reviewText
      productCode
      reviewMedia {
        images
        videos
      }
      isPublished
    }
  }
`;

const useAllReviews = async (token) => {
  const requestHeaders = {
    authorization: `Bearer ${token}`,
  };
  if (token) {
    const data = await Client.request(GET_ALL_REVIEWS, {}, requestHeaders);

    const reviews = data.getAllReviews.map((review) => ({
      id: review.id,
      createdAt: '19th Feb, 2021',
      SKU: review.productCode,
      title: review.title,
      rating: review.rating,
      reviewText: review.reviewText,
      images: +review.reviewMedia.images + +review.reviewMedia.videos,
    }));

    return reviews;
  } else return [];
};

export default useAllReviews;
