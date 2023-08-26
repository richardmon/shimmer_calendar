import React from "react";
import AuthenticationLayout from "../Layout/AuthenticationLayout";
import LoginForm from "../Components/LoginForm";

const Login: React.FC = () => {
  return (
    <AuthenticationLayout>
      <LoginForm />
    </AuthenticationLayout>
  );
};

export default Login;
