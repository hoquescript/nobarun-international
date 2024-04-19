import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: "https://naubaun.herokuapp.com/graphql",
  // uri: "https://api.biznian.com/graphql",
  uri: "https://nobarun.xyz/graphql",
  cache: new InMemoryCache(),
});


export default client;