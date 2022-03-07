import { GraphQLClient } from 'graphql-request';

// const Client = new GraphQLClient('https://naubaun.herokuapp.com/graphql', {
const Client = new GraphQLClient('http://api.biznian.com/graphql', {
  headers: {},
});

export default Client;
