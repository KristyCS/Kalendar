import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import TodayProvider from "./context/Today";
import LeftNavigationBarProvider from "./context/LeftNavigationBar";
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TodayProvider>
        <LeftNavigationBarProvider>
          <App />
        </LeftNavigationBarProvider>
      </TodayProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
