import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_COLLECTION_BY_ID = gql`
  query getCollectionById($id: String!) {
    getSingleCollection(collectionId: $id) {
      id
      name
      description
      image
      slug
      isPublished
    }
  }
`;

const useCollectionById = async (fid, token) => {
  const requestHeaders = {
    authorization: `Bearer ${token}`,
  };
  if (token) {
    const data = await Client.request(
      GET_COLLECTION_BY_ID,
      { id: fid },
      requestHeaders,
    );
    const collectionById = data.getSingleCollection;
    const collection = {
      id: collectionById.id,
      collectionName: collectionById.name,
      description: collectionById.description,
      image: collectionById.image,
      collectionSlug: collectionById.slug,
      isPublished: collectionById.isPublished,
    };
    return collection;
  } else return {};
};

export default useCollectionById;
