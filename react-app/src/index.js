import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import CurrentDateProvider from "./context/CurrentDate";
import LeftNavigationBarProvider from "./context/LeftNavigationBar";
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrentDateProvider>
        <LeftNavigationBarProvider>
          <App />
        </LeftNavigationBarProvider>
      </CurrentDateProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
