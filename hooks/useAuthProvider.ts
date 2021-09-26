import { HttpLink, ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GraphQLClient } from 'graphql-request';
import { getSession } from 'next-auth/client';
import { useState, useEffect } from 'react';

export default function useAuthProvider() {
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
      uri: 'https://naubaun.herokuapp.com/graphql',
      headers: getAuthHeaders(),
    });
    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  const createGraphQLRequestClient = () => {
    const Client = new GraphQLClient('https://naubaun.herokuapp.com/graphql', {
      // @ts-ignore
      headers: getAuthHeaders(),
    });
    return Client;
  };
  return {
    setAuthToken,
    createApolloClient,
    createGraphQLRequestClient,
  };
}
