import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

function Layout() {
  const { isSidebarOpen } = useSelector((state) => state.sidebar);
  return (
    <div className={isSidebarOpen ? "body_main active" : "body_main"}>
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Layout;
