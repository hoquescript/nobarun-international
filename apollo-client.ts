import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  // uri: 'https://nobarun.herokuapp.com/',
  cache: new InMemoryCache(),
});

export default client;
