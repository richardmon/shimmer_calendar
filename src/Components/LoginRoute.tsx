import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../State/AuthState";

type LoginRouteProps = {
  children?: ReactNode;
};

const LoginRoute: React.FC<LoginRouteProps> = ({ children }) => {
  const { user, loading } = useAuth() ?? {
    user: null,
    loading: false,
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user !== null) {
      navigate("/"); // Redirect to main page
    }
  }, [user, loading, navigate]);

  return user === null ? children : null;
};

export default LoginRoute;
