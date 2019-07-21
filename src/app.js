import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import localstoreConfig from "./services/localstore";
import "./styles/base.css";
import "whatwg-fetch";

import { ActivePlayerProvider } from "./context/ActivePlayer";
import * as Pages from "./pages";

localstoreConfig();

const App = () => (
  <ActivePlayerProvider>
    <Router>
      <Switch>
        <Route component={Pages.PlayerSearch} exact path="/" />
        <Route component={Pages.PlayerStats} exact path="/stats" />
      </Switch>
    </Router>
  </ActivePlayerProvider>
);

ReactDom.render(<App />, document.getElementById("app-root"));

if (PRODUCTION_ENV && "serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
