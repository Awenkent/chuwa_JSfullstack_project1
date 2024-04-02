import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Routes, Route, Link } from "react-router-dom";
const rootElement = document.getElementById("root");
import store from "./redux/store";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import {CartApp} from "./components/cartApp"
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
  
  <Provider store={store}>
      
      <App />
      <div style={{ position: "fixed", top: 200, right: 0, zIndex: 999 }}>
            <CartApp />
          </div>
      </Provider>

  </React.StrictMode>
);
