import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/store/store";

import App from "./App";
import "./assets/scss/style.scss";
import "antd/dist/antd.css";
import registerServiceWorker from "./registerServiceWorker";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();
