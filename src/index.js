// REACT
import React from "react";
import ReactDOM from "react-dom";

// ESTILOS
import "./index.css";

// COMPONENTES
import App from "./app";
import reportWebVitals from "./reportWebVitals";

// RENDER
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
