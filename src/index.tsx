import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './state/reducers';

import { BrowserRouter as Router } from 'react-router-dom';
import { InitState } from './state/InitState';
import { FirebaseListeners } from './firebase/FirebaseListeners';

const middleware = [
  // @ts-ignore
  ...(window.__REDUX_DEVTOOLS_EXTENSION__
    ? [(window as any).__REDUX_DEVTOOLS_EXTENSION__()]
    : []),
];

// const initialState = {
//   user: null,
// };

const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(thunk), ...middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <FirebaseListeners />
    <InitState />
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
