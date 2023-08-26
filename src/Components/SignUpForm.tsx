import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../utils/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

type SignUpSubmit = {
  email: string;
  password: string;
};

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSubmit>();
  const [firebaseError, setFirebaseError] = useState(null);

  const onSubmit = async (data: SignUpSubmit) => {
    try {
      setFirebaseError(null);
      await createUserWithEmailAndPassword(auth, data.email, data.password);
    } catch (err: any) {
      setFirebaseError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 w-96">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">SignUp</h2>
        {firebaseError && (
          <div>
            <p className="mt-2 p-2 border-l-4 border-red-500 bg-red-50 text-red-700 rounded">
              {firebaseError}
            </p>
          </div>
        )}
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
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
