import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_CLIENT_BY_ID = gql`
  query getClientById($id: String!) {
    findClientById(clientId: $id) {
      id
      clientName
      image: logo
      relatedCategory
      description
      isPublished
    }
  }
`;

const useClientById = async (clid, token) => {
  const requestHeaders = {
    authorization: `Bearer ${token}`,
  };
  if (token) {
    const data = await Client.request(
      GET_CLIENT_BY_ID,
      { id: clid },
      requestHeaders,
    );
    // const categoryById = data.getCategoryById;
    // const category = {
    //   id: categoryById.id,
    //   categoryName: categoryById.name,
    //   description: categoryById.description,
    //   image: categoryById.image,
    //   categorySlug: categoryById.slug,
    //   isPublished: categoryById.isPublished,
    // };
    return data.findClientById;
  } else return {};
};

export default useClientById;
