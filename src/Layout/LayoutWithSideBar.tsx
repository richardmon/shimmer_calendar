import React, { ReactNode, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebaseConfig";
import { useAuth } from "../State/AuthState";

type LayoutWithSidebarProps = {
  title: string;
  children: ReactNode;
};

const LayoutWithSidebar: React.FC<LayoutWithSidebarProps> = ({
  children,
  title,
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const closeSession = (...args: any[]) => {
    signOut(auth).then(() =>
      console.log("closing session and outputing", args),
    );
  };

  const location = useLocation();
  const { user } = useAuth() ?? { user: null };

  useEffect(() => {
    if (user) {
      user.getIdTokenResult().then((idTokenResult) => {
        setIsAdmin(idTokenResult.claims.isAdmin as boolean);
      });
    }
  }, [user]);

  return (
    <div className="w-100">
      <div className="flex h-screen bg-shimmer-blue flex-direct">
        <div className="flex flex-col h-full bg-white w-64 p-4 text-black border-r border-shimmer-divider-blue">
          <h1 className="text-2xl mb-4">Shimmer Calendar</h1>
          <div>
            <Link
              to="/"
              className={`items-center border border-white rounded-lg text-[#06202c] cursor-pointer flex font-extrabold mb-4 p-3 ${
                location.pathname === "/" ||
                location.pathname === "/confirmation"
                  ? "bg-shimmer-dark-blue"
                  : ""
              }`}
            >
              Calendar
            </Link>
            {isAdmin && (
              <Link
                to="/list-users"
                className={`items-center border border-white rounded-lg text-[#06202c] cursor-pointer flex font-extrabold mb-4 p-3 ${
                  location.pathname === "/list-users"
                    ? "bg-shimmer-dark-blue"
                    : ""
                }`}
              >
                List Users
              </Link>
            )}
          </div>
          <div className="mt-auto">
            <button className="align-bottom" onClick={() => closeSession()}>
              Logout
            </button>
          </div>
        </div>
        <div className="flex-1 p-8">
          <h1 className="text-3xl mb-4">{title}</h1>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
