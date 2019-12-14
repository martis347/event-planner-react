import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://localhost:44300/graphql"
});

export default client;
