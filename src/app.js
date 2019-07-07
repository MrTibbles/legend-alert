import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import localforage from "localforage";

import * as Pages from "./pages";

import "./styles/base.css";

const App = () => (
  <Router>
    <Route component={Pages.PlayerSearch} exact path="/" />
  </Router>
);

ReactDom.render(<App />, document.getElementById("app-root"));
