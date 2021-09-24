import { GraphQLClient } from 'graphql-request';

const Client = new GraphQLClient('https://naubaun.herokuapp.com/graphql', {
  headers: {},
});

export default Client;
