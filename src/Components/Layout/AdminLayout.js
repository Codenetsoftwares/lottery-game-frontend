import React from "react";
import NavTop from "./NavTop";
import Footer from "./Footer";
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
        <NavTop />
      </div>

      {/* Main Content Area */}
      <div
        className="flex-grow-1"
        style={{
          overflow: "hidden", // Disable scrolling on the parent div
        }}
      >
        <div
          className="p-4"
          style={{
            height: "100%", // Fill available height for the main content
            overflowY: "auto", // Only allow scrolling inside the Layout if necessary
          }}
        >
          <Layout />
        </div>
      </div>

      {/* Footer Component */}
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          width: '100%',
        }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
