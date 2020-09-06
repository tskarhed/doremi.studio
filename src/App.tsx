import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Main, Play, Setlist, Song, LoginView } from './views';
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
// Initialize Sampler
import './sound/synth';
import './App.scss';
import { firebaseApp } from './firebase/firebase';

function App() {
  let location = useLocation();
  const [ auth, setAuth ] = useState({
    auth: false,
    init: true
  })

  useEffect(() => firebaseApp.auth().onAuthStateChanged(user =>  {
    if(user){
      setAuth({auth: true, init: false});
    } else {
      setAuth({ auth: false, init: false});
    }
  }), [setAuth]);


  if (!auth.auth && !auth.init && location.pathname !== '/login') {
    return <Redirect to="/login" />;
  }
    
  if (!auth.auth && auth.init) {
    return <span>Loading...</span>
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
