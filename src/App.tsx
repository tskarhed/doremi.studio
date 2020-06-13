import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Main, Play, Setlist, Song } from './views';

// Initialize Sampler
import './sound/synth';
import './App.scss';
import { StoreState } from './state/types';
import { Search } from './components/Search';
import { useSelector } from 'react-redux';

function App() {
  const state = useSelector((state: StoreState) => state);
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
      {state.isSearching && (
        <Search
          isSearching={state.isSearching}
          setlists={state.setlists}
          songs={state.songs}
        />
      )}
    </Router>
  );
}

export default App;
