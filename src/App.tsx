import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Main, Play, Setlist, Song } from "./views";

// Initialize Sampler
import "./sound/synth";
import "./App.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/setlist/:setlistName/play/:songNumber">
          <Play />
        </Route>
        <Route exact path="/setlist/:setlistName">
          <Setlist />
        </Route>
        <Route path="/song/:songName">
          <Song />
        </Route>

        <Redirect exact from="/setlist" to="/" />
        <Redirect
          exact
          from="/setlist/:setlistName/play"
          to="/setlist/:setlistName"
        />
        {/* <Redirect to="/" /> */}
        <Route path="/*">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
