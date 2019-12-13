import React from "react";
import ReactDOM from "react-dom";
import WebFontLoader from "webfontloader";
import App from "./App";

WebFontLoader.load({
  google: { families: ["Google Sans:100,200,300,400,500,600,700,800,900"] }
});

ReactDOM.render(<App />, document.getElementById("root"));
