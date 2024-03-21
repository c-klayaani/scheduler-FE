import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "primeicons/primeicons.css";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/context";
import { ApiInterceptor } from "./api/ApiInterceptor";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AppContextProvider>
    <BrowserRouter>
      <ApiInterceptor />
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </AppContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
