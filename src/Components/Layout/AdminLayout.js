import React from 'react'
import NavTop from './navTop'
import NavSide from './navSide'
import Layout from './Layout'

const AdminLayout = () => {
  return (
    <div className="d-flex flex-column vh-100">
    {/* Sticky Top Navigation */}
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1030,  // Higher z-index than default, ensures visibility over sidebar
      }}
      className="flex-shrink-0"
    >
      <NavTop />
    </div>

    <div className="d-flex flex-grow-1 overflow-hidden p-5">
      {/* Sidebar */}
      <div
        className="flex-shrink-0"
        style={{
          width: '250px',
          maxWidth: '250px',
          overflowY: 'auto',
          zIndex: 1040, // Lower z-index than NavTop to ensure NavTop is above
        }}
      >
        <NavSide />
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1 p-3 overflow-auto"
        style={{
          padding: '20px',
          overflowY: 'auto',
        }}
      >
        <Layout />
      </div>
    </div>
  </div>
  )
}

export default AdminLayout