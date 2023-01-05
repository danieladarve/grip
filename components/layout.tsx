import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative h-screen w-full scrollbar-hide">{children}</main>
  );
};

export default Layout;
