import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';

const preventAllMutationsLink = new ApolloLink((operation, forward) => {
  if (
    operation.query.definitions.some(
      (definition) =>
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'mutation',
    )
  ) {
    alert('You dont have permission to perform this action');
    return null;
  }
  return forward(operation);
});

export default function useApolloClient() {
  const [authToken, setAuthToken] = useState<string | null | unknown>(null);
  useEffect(() => {
    async function getToken() {
      const session = await getSession();
      if (session) {
        setAuthToken(session?.accessToken);
      }
    }
    getToken();
  }, []);

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `Bearer ${authToken}`,
    };
  };

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: 'https://nobarun.xyz/graphql',
      headers: getAuthHeaders(),
    });
    return new ApolloClient({
      link: ApolloLink.from([preventAllMutationsLink, link]),
      cache: new InMemoryCache(),
    });
  };

  return createApolloClient;
}
