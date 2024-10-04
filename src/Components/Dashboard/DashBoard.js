import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashBoard = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="bg-primary text-white text-center py-3">
        <h1>DashBoard</h1>
      </header>

      {/* Body */}
      <main className="flex-grow-1 container my-4">
        <div className="row">
          <div className="col">
            <p className="lead">Welcome to your dashboard. Manage your data and view statistics here.</p>
            <p>This is a sample dashboard body section.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-2">
        <p>&copy; 2024 Your Company</p>
      </footer>
    </div>
  );
};

export default DashBoard;
