import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../Context/Auth.jsx";
import { Toaster } from "react-hot-toast";
import { SearchProvider } from "../Context/Search.jsx";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SearchProvider>
        <Toaster />
        <App />
      </SearchProvider>
    </AuthProvider>
  </BrowserRouter>
);
