import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => (
  <Router>
    <Route exact path="/" render={() => <div>Legend Alert</div>} />
  </Router>
);

ReactDom.render(<App />, document.getElementById("app-root"));
