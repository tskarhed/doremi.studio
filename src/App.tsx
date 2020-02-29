import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Main, Play, Setlist, Song } from "./views";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/setlist/:setlistName/play/:songNumber">
          <Play />
        </Route>
        <Route path="/setlist/:setlistName">
          <Setlist />
        </Route>
        <Route path="/song/:songName">
          <Song />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
