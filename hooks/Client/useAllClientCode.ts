import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_CLIENT_CODE = gql`
  query getAllProductCode {
    getAllClients {
      id: clientName
      value: id
    }
  }
`;

const useAllClientCode = async () => {
  const data = await Client.request(GET_ALL_CLIENT_CODE);
  return data.getAllClients;
};

export default useAllClientCode;
