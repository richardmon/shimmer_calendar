import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Pages/Main.tsx";
import Login from "./Pages/Login.tsx";
import SignUp from "./Pages/SignUp.tsx";
import { AuthProvider } from "./State/AuthState.tsx";
import { AppointmentProvider } from "./State/DateContext.tsx";
import Confirmation from "./Pages/Confirmation.tsx";
import "./index.css";
import ProtectedRoute from "./Components/ProtectedRoute.tsx";
import LoginRoute from "./Components/LoginRoute.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppointmentProvider>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <LoginRoute>
                  <Login />
                </LoginRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <LoginRoute>
                  <SignUp />
                </LoginRoute>
              }
            />
            <Route
              path="/confirmation"
              element={
                <ProtectedRoute>
                  <Confirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AppointmentProvider>
    </AuthProvider>
  </React.StrictMode>,
);
