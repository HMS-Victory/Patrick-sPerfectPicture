import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import {thunk} from 'redux-thunk';
import {Reducers} from "./reducers";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(Reducers, compose(applyMiddleware(thunk)));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
