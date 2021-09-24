import { gql, useQuery } from '@apollo/client';

const GET_ALL_QUERIES = gql`
  query GetAllQueries {
    getAllQueryUsers {
      name
      phone
      email
      address
      message
      notes
      product
    }
  }
`;

const useAllQuery = () => {
  const { loading, error, data } = useQuery(GET_ALL_QUERIES);
  let modifiedData = [];
  if (data) {
    modifiedData = data.getAllQueryUsers.map((query) => ({
      ...query,
      date: '19 June, 2021',
      SKU: '#4567rt',
    }));
  }
  return { loading, error, data: modifiedData };
};

export default useAllQuery;
