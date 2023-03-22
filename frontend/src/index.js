import React from "react";
import ReactDOM from "react-dom/client";
import "./bootstrap.min.css"; //bootswatch .com sai
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //provider passes store as prop to our app for giving acess to store
  <Provider store={store}>
    <App />
  </Provider>
);
