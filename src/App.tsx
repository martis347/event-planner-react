import React from "react";
import { createGlobalStyle } from "styled-components";
import Container from "./container/Container";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
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
    <>
      <GlobalStyle />
      <Container />
    </>
  );
};

export default App;
