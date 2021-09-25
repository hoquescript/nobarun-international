import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_REDIRECT = gql`
  query getAllRedirects {
    getAllTheRedirects {
      id
      redirectFrom
      redirectTo
      isPublished
    }
  }
`;

const useAllRedirects = async () => {
  const data = await Client.request(GET_ALL_REDIRECT);

  const redirects = {};
  if (data) {
    data.getAllTheRedirects.forEach((redirect) => {
      redirects[redirect.id] = {
        from: redirect.redirectFrom,
        to: redirect.redirectTo,
        isPublished: redirect.isPublished,
        isDisabled: true,
      };
    });
  }
  return redirects;
};

export default useAllRedirects;
