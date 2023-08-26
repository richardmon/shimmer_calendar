import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const AuthenticationLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex">
      <div className="hidden md:flex md:flex-1 bg-blue-800">
        {/* This is the left side with a solid color background, it disapears in smaller screens. */}
      </div>
      <div className="flex-1 h-screen">
        <div className="flex justify-center items-center">{children}</div>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
