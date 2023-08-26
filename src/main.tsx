import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Pages/Main.tsx";
import Login from "./Pages/Login.tsx";
import SignUp from "./Pages/SignUp.tsx";
import { AuthProvider } from "./State/AuthState.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
);
