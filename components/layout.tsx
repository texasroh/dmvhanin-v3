import React from "react";
import Footer from "./footer";
import Header from "./header";
import TinyHeader from "./tinyHeader";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="relative min-h-screen pb-40">
      <Header />
      <TinyHeader />
      <div className="px-2">
        <div className="mx-auto max-w-[770px]">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
