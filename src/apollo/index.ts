import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://hyarchis-event-planner.azurewebsites.net/graphql"
});

export default client;
