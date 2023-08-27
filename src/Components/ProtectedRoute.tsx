import React, { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../State/AuthState";

type ProtectedRouteProps = {
  children?: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth() ?? {
    user: null,
    loading: false,
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user === null) {
      navigate("/login");
    }
  }, [loading, user]);

  return user ? children : null;
};

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   console.log("ProtectedRoute rendered");
//   const user = useUser();
//   const navigate = useNavigate();
//
//   useEffect(() => {
//     if (user === null) {
//       navigate("/login");
//     }
//   }, []);
//
//   return user ? children : null;
// };

export default ProtectedRoute;
