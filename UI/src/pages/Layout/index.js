import React from "react";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Sidebar from "../../components/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div>
      <SearchBar />
      <main className="Layout-main">
        <div className="sidebar-container">
          <Sidebar />
        </div>

        {/* <div className="sidebar-substitute">sidebar</div> */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
