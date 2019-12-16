import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import WebFontLoader from "webfontloader";
import App from "./App";
import "react-perfect-scrollbar/dist/css/styles.css";
import apolloClient from "./apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import * as serviceWorker from "./serviceWorker";

serviceWorker.register();

WebFontLoader.load({
  google: { families: ["Google Sans:100,200,300,400,500,600,700,800,900"] }
});

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
