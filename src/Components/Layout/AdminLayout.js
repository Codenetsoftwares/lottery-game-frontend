import React from 'react';
import Footer from './Footer';
import Layout from './Layout';
import NavTop from './NavTop';

const AdminLayout = () => {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Sticky Top Navigation */}
      <div
        style={{
          position: 'sticky',
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
          overflow: 'hidden', // Disable scrolling on the parent div
        }}
      >
        <div className="p-4">
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
