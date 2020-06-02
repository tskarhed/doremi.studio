import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {createStore, applyMiddleware, compose} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./state/reducers";
import { loadState, saveState } from './state/localStorage';
import throttle from 'lodash.throttle';

const persistedState = loadState();
console.log(persistedState);

const middleware = [
    // @ts-ignore
    ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : []),
    applyMiddleware(thunk)
];

const store = createStore(rootReducer, persistedState, compose(...middleware));
store.subscribe(throttle(() => {
    // Save songs and setlists to localStorage when the state updates
    console.log("saving state")
    const { setlists, songs } = store.getState();
    saveState({setlists, songs});
}, 1000));

ReactDOM.render(
<Provider store={store}>
    <App/>
</Provider>,
document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
