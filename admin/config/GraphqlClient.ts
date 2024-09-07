import { GraphQLClient } from 'graphql-request';

const Client = new GraphQLClient('https://nobarun.xyz/graphql', {
  headers: {},
});

export default Client;
