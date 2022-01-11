import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_QUERY_BY_ID = gql`
  query getQueryById($id: String!) {
    getSingleQueryUserById(queryUserId: $id) {
      name
      phone
      email
      address
      attachment
      company
      message
      notes
      productCode
    }
  }
`;

const useQueryById = async (qid, token) => {
  const requestHeaders = {
    authorization: `Bearer ${token}`,
  };
  if (token) {
    const data = await Client.request(
      GET_QUERY_BY_ID,
      { id: qid },
      requestHeaders,
    );
    const queryById = data.getSingleQueryUserById;
    const query = {
      companyName: queryById.company,
      email: queryById.email,
      fullName: queryById.name,
      message: queryById.message,
      notes: queryById.notes,
      number: queryById.phone,
      address: queryById.address,
      productCode: queryById.productCode,
      attachment: {
        images: [queryById.attachment],
        videos: [],
      },
    };
    return query;
  } else return {};
};

export default useQueryById;
