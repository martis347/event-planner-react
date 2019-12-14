import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import locale from "date-fns/locale/en-GB";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core/styles";
import Container from "./container/Container";
import {
  AuthenticationContext,
  useAuthenticationContext
} from "context/AuthenticationContext";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  span, div, button, input, textarea, p, label {
    font-family: 'Google Sans', sans-serif !important;
    font-weight: 400;
    color: #3c4043;
  }

  .MuiPickersBasePicker-container {
    span {
      color: inherit;
    }

    .MuiPickersClockNumber-clockNumberSelected {
      color: white;
    }

    .MuiTabs-flexContainer {
      svg {
        color: white;
      }
    }
  }

  #root {
    height: 100%;
  }

  #root > div {
    height: 100%;
  }
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#182659"
    }
  }
});

const App = () => {
  const data = useAuthenticationContext();

  return (
    <AuthenticationContext.Provider value={data}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
          <GlobalStyle />
          <Container />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </AuthenticationContext.Provider>
  );
};

export default App;
