import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_COLLECTIONS = gql`
  query getAllCollection {
    getAllTheCollection {
      id
      name
      description
      image
      slug
      isPublished
    }
  }
`;

const useAllCollections = async () => {
  const data = await Client.request(GET_ALL_COLLECTIONS);
  return data.getAllTheCollection;
};

export default useAllCollections;
