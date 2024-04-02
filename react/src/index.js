import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Routes, Route, Link } from "react-router-dom";
const rootElement = document.getElementById("root");
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
