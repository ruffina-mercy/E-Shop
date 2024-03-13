import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <div id="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
