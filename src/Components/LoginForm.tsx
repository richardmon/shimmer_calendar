import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type LoginSubmit = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSubmit>();

  const onSubmit = (data: LoginSubmit) => {
    console.log(data);
    // Handle your login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 w-96">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-gray-600">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="p-2 border rounded-md"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-gray-600">
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="p-2 border rounded-md"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
          >
            Login
          </button>
          <div className="flex justify-center items-center">
            <Link to="/signup" className="text-center text-blue-900">
              SignUp
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
