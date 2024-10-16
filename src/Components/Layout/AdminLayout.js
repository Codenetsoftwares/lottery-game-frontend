import React from "react";
import NavTop from "./navTop";
import NavSide from "./navSide";
import Layout from "./Layout";

const AdminLayout = () => {
  return (
    <div className="d-flex flex-column vh-100">
    {/* Sticky Top Navigation */}
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1030, 
      }}
    >
      <NavTop/>
    </div>
  
    <div className="d-flex flex-grow-1  overflow-hidden">
      {/* Sidebar */}
      {/* <div
        className="flex-shrink-0"
        style={{
          width: "250px",
          maxWidth: "250px",
          height: "100%", // Ensure full vertical height for the sidebar
          overflowY: "auto",
          zIndex: 1040, // NavTop still remains above
        }}
      >
        <NavSide />
      </div> */}
  
      {/* Main Content */}
      <div
        className="flex-grow-1 p-4"
        style={{
          // paddingTop: "100px", // Adjust gap between NavTop and Layout
          overflowY: "auto",
        }}
      >
        <Layout />
      </div>
    </div>
  </div>
  
  );
};

export default AdminLayout;
