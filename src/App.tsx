import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Main, Play, Setlist, Song, LoginView } from './views';
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
// Initialize Sampler
import './sound/synth';
import './App.scss';
import { firebaseApp } from './firebase/firebase';

function App() {
  let location = useLocation();

  if (!firebaseApp.auth().currentUser && location.pathname !== '/login') {
    return <Redirect to="/login" />;
  }

  return (
    <AnimateSharedLayout type="crossfade">
      <AnimatePresence exitBeforeEnter>
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
          <Route path="/login">
            <LoginView />
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
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}

export default App;
