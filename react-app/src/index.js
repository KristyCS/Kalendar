import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import CurrentDayProvider from "./context/CurrentDay";
import LeftNavigationBarProvider from "./context/LeftNavigationBar";
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrentDayProvider>
        <LeftNavigationBarProvider>
          <App />
        </LeftNavigationBarProvider>
      </CurrentDayProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
