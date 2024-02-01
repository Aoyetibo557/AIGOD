import React from "react";
import Header from "../header/Header";
import Footer from "../footer/footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header showNav />
      <div>{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
