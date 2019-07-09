import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import localforage from "localforage";
import "./styles/base.css";
import "whatwg-fetch";

import { ActivePlayerProvider } from "./context/ActivePlayer";
import * as Pages from "./pages";

localforage.config({
  description: "Apex Legends player stats tracker",
  name: "legend-alert",
  storeName: "players"
});

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
