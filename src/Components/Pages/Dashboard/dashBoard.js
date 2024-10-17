import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container-fluid d-flex flex-column  " style={{ backgroundColor: '#f0f4f8' }}>
      <div className="flex-grow-1 p-4">
        <div className="text-center mb-4">
          <h1 style={{ color: '#2A4058', fontWeight: 'bold', fontSize: '2.5rem' }}>
            🎉 Welcome to the Lottery Game Admin Dashboard 🎉
          </h1>
          <p style={{ fontStyle: 'italic', color: '#A5B8D1', fontSize: '1.3em' }}>
            This web application is still under development
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div
              className="card"
              style={{
                borderRadius: '20px',
                backgroundColor: '#FFB7B2',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="card-body text-center">
                <i className="fas fa-ticket-alt fa-3x" style={{ color: '#fff' }} />
                <h5 className="card-title mt-2" style={{ color: '#fff', fontSize: '1.5em' }}>
                  Create Lottery
                </h5>
                <p className="card-text" style={{ color: '#fff' }}>
                  Easily create new lotteries with different timings.
                </p>
                <Link to="/lottery-markets" className="btn btn-light" style={{ borderRadius: '50px' }}>
                  Go to Create
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div
              className="card"
              style={{
                borderRadius: '20px',
                backgroundColor: '#FF677D',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="card-body text-center">
                <i className="fas fa-history fa-3x" style={{ color: '#fff' }} />
                <h5 className="card-title mt-2" style={{ color: '#fff', fontSize: '1.5em' }}>
                  Purchased History
                </h5>
                <p className="card-text" style={{ color: '#fff' }}>
                  View the purchase history of all users.
                </p>
                <Link to="/purchase-history" className="btn btn-light" style={{ borderRadius: '50px' }}>
                  View History
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div
              className="card"
              style={{
                borderRadius: '20px',
                backgroundColor: '#FF9AA2',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="card-body text-center">
                <i className="fas fa-search fa-3x" style={{ color: '#fff' }} />
                <h5 className="card-title mt-2" style={{ color: '#fff', fontSize: '1.5em' }}>
                  Search Lottery
                </h5>
                <p className="card-text" style={{ color: '#fff' }}>
                  Search for created lotteries quickly.
                </p>
                <Link to="/search-lottery" className="btn btn-light" style={{ borderRadius: '50px' }}>
                  Search
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div
              className="card"
              style={{
                borderRadius: '20px',
                backgroundColor: '#D4A5A5',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="card-body text-center">
                <i className="fas fa-trophy fa-3x" style={{ color: '#fff' }} />
                <h5 className="card-title mt-2" style={{ color: '#fff', fontSize: '1.5em' }}>
                  View Results
                </h5>
                <p className="card-text" style={{ color: '#fff' }}>
                  Check results for today and the past 3 months.
                </p>
                <Link to="/results" className="btn btn-light" style={{ borderRadius: '50px' }}>
                  View Results
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div
              className="card"
              style={{
                borderRadius: '20px',
                backgroundColor: '#B9FBC0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="card-body text-center">
                <i className="fas fa-money-bill-wave fa-3x" style={{ color: '#fff' }} />
                <h5 className="card-title mt-2" style={{ color: '#fff', fontSize: '1.5em' }}>
                  Authorize Win
                </h5>
                <p className="card-text" style={{ color: '#fff' }}>
                  Authorize winning options for lotteries.
                </p>
                <Link to="/win" className="btn btn-light" style={{ borderRadius: '50px' }}>
                  Authorize
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <p style={{ fontSize: '1.2em', color: '#2A4058' }}>
            🎈 Create lotteries for different timings: 1 PM, 4 PM, and 8 PM every day! 🎈
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
