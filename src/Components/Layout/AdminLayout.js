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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Ensures space between header and footer
      }}
    >
      <div className="p-4" style={{ flex: 1 }}>
        {/* This is where your Layout or main content goes */}
        <Layout />
      </div>
    </div>
  
    {/* Footer Component */}
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        width: '100%',
        marginTop: 'auto', // Ensures the footer is pushed to the bottom and stays there
        paddingTop: '20px', // Ensures space between the body content and the footer
        backgroundColor: '#f8f9fa', // Give footer a background color for visibility
      }}
    >
      <Footer />
    </div>
  </div>
  

  );
};

export default AdminLayout;
