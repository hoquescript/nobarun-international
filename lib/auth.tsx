import React, { useState, useContext, createContext } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client';

const authContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const isSignedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

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
    console.log(link);
    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  const signIn = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const client = createApolloClient();
    const LOGIN_QUERY = gql`
      query {
        login(data: { email: "azim@gmail.com", password: "iwilldoit" }) {
          id
          token
        }
      }
    `;

    const res = await client.query({
      query: LOGIN_QUERY,
      variables: { username, password },
    });
    // const result = await client.mutate({
    //   mutation: LOGIN_QUERY,
    //   variables: { username, password },
    // });

    console.log(res);

    // if (result?.data?.login?.token) {
    //   setAuthToken(result.data.login.token);
    // }
    setAuthToken('kjhfkjafiusdtyfg98798634');
  };

  const signOut = () => {
    setAuthToken(null);
  };

  return {
    setAuthToken,
    isSignedIn,
    signIn,
    signOut,
    createApolloClient,
  };
}
