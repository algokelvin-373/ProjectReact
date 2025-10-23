import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // ← HARUS ADA
import Splash from "./pages/Splash.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Splash />
  </React.StrictMode>
);
