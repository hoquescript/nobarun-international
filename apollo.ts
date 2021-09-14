import { HttpLink, ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { getSession } from 'next-auth/client';
import { useState, useEffect } from 'react';

export default function useProvideAuth() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    async function getToken() {
      const session = await getSession();
      console.log(session);
      if (session) setAuthToken(session?.accessToken);
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
      uri: 'https://nobarun.herokuapp.com/graphql',
      headers: getAuthHeaders(),
    });
    console.log(link);
    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  return {
    setAuthToken,
    createApolloClient,
  };
}
