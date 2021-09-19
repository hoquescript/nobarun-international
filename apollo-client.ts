import { HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { getSession } from 'next-auth/client';

const getAuthHeaders = async () => {
  const session = await getSession();
  const authToken = session?.accessToken;
  console.log(authToken);
  if (!authToken) return null;

  return {
    authorization: `Bearer ${authToken}`,
  };
};

const link = new HttpLink({
  uri: 'https://naubaun.herokuapp.com/graphql',
  headers: getAuthHeaders().then((res) => res),
});
console.log(link);

const client = new ApolloClient({
  uri: 'https://naubaun.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

export default client;
