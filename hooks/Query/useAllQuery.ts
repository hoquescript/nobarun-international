import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_QUERIES = gql`
  query GetAllQueries {
    getAllQueryUsers {
      id
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

const useAllQuery = async (token) => {
  const requestHeaders = {
    authorization: `Bearer ${token}`,
  };
  if (token) {
    const data = await Client.request(GET_ALL_QUERIES, {}, requestHeaders);
    return data.getAllQueryUsers.map((query) => ({
      ...query,
      date: '19 June, 2021',
      SKU: '#4567rt',
    }));
  } else return [];
};

export default useAllQuery;
