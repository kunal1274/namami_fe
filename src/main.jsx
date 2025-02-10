
import React from "react";
import ReactDOM from "react-dom/client";
import AppKunalVersion from "./AppKunalVersion.jsx";
import "./index.css";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";

//import 'bootstrap/dist/css/bootstrap.min.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';
// import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* <MemoryRouter>
      <App />
    </MemoryRouter> */}{" "}
    {/** this will be used so that no one can directly navigate to the url by typing */}

  </React.StrictMode>
)
