import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_REVIEW_BY_ID = gql`
  query getReviewById($id: String!) {
    getSingleReview(reviewId: $id) {
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
      createdAt
    }
  }
`;

const useReviewById = async (qid, token) => {
  const requestHeaders = {
    authorization: `Bearer ${token}`,
  };
  if (token) {
    const data = await Client.request(
      GET_REVIEW_BY_ID,
      { id: qid },
      requestHeaders,
    );
    const reviewById = data.getSingleReview;
    const review = {
      title: reviewById.title,
      name: reviewById.name,
      email: reviewById.email,
      rating: reviewById.rating,
      reviewText: reviewById.reviewText,
      productCode: reviewById.productCode,
      reviewMedia: reviewById.reviewMedia,
      isPublished: reviewById.isPublished,
    };
    return review;
  } else return {};
};

export default useReviewById;
