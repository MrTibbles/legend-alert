import * as React from "react";
import * as ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import localstoreConfig from "./services/localstore";
import "./styles/base.css";
import "whatwg-fetch";

import { ActivePlayerProvider } from "./context/ActivePlayer";
import { Loading } from "./primitives";

const PlayerSearch = React.lazy(() => import("./pages/PlayerSearch"));
const PlayerStats = React.lazy(() => import("./pages/PlayerStats"));

localstoreConfig();

const App: React.FunctionComponent = (): JSX.Element => (
  <ActivePlayerProvider>
    <React.Suspense fallback={<Loading fullScreen />}>
      <Router>
        <Switch>
          <Route component={PlayerSearch} exact path="/" />
          <Route component={PlayerStats} exact path="/stats" />
        </Switch>
      </Router>
    </React.Suspense>
  </ActivePlayerProvider>
);

ReactDom.render(<App />, document.getElementById("app-root"));

if (PRODUCTION_ENV && "serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/public/service-worker.js");
  });
}
