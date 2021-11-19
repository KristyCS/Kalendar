import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import { ModalProvider } from "./context/Modal";
import App from "./App";
import configureStore from "./store";
import CurrentDateProvider from "./context/CurrentDate";
import EventLabelProvider from "./context/EventLabel";
import RsvpChangeProvider from "./context/rsvpUpdate";
import LeftNavigationBarProvider from "./context/LeftNavigationBar";
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <CurrentDateProvider>
          <EventLabelProvider>
            <RsvpChangeProvider>
              <LeftNavigationBarProvider>
                <App />
              </LeftNavigationBarProvider>
            </RsvpChangeProvider>
          </EventLabelProvider>
        </CurrentDateProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
