import React from "react";
import AuthenticationLayout from "../Layout/AuthenticationLayout";
import SignUpForm from "../Components/SignUpForm";

const Login: React.FC = () => {
  return (
    <AuthenticationLayout>
      <SignUpForm />
    </AuthenticationLayout>
  );
};

export default Login;
