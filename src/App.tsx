import React from "react";
import { createGlobalStyle } from "styled-components";
import { ApolloProvider } from "@apollo/react-hooks";
import Container from "./container/Container";
import apolloClient from "./apollo";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  span, div, button {
    font-family: 'Google Sans', sans-serif;
    font-weight: 400;
    color: #3c4043;
  }

  #root {
    height: 100%;
  }

  #root > div {
    height: 100%;
  }
`;

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <GlobalStyle />
      <Container />
    </ApolloProvider>
  );
};

export default App;
