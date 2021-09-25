import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_REVIEWS = gql`
  query getAllReviews {
    getAllReviewsForAProduct(productId: "614dba9ac8d3558394d7e4a8") {
      id
      title
      name
      product
    }
  }
`;

const useAllReviews = async () => {
  const data = await Client.request(GET_ALL_REVIEWS);

  const admins = data.getAllTheUsers.map((query) => ({
    id: query.id,
    fullName: query.firstName + ' ' + query.lastName,
    email: query.email,
    phone: query.number,
    title: query.displayName,
    role: 'Superuser',
  }));

  return admins;
};

export default useAllReviews;
