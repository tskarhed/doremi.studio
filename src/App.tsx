import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Main, Play, Setlist, Song } from './views';
import { AnimateSharedLayout } from 'framer-motion';

// Initialize Sampler
import './sound/synth';
import './App.scss';

function App() {
  let location = useLocation();
  return (
    <AnimateSharedLayout type="crossfade">
      <Switch location={location} key={location.key}>
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
    </AnimateSharedLayout>
  );
}

export default App;
