import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="fullscreen relative w-full scrollbar-hide">
      {children}
    </main>
  );
};

export default Layout;
