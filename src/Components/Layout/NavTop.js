import React from 'react';
import { useAppContext } from '../../contextApi/context';
import strings from '../../Utils/constant/stringConstant';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './navTop.css'; // Import your custom CSS for additional styling

const NavTop = () => {
  const { dispatch, store } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      dispatch({ type: strings.LOG_OUT });
      toast.success('Logged out successfully!');
      navigate('/');
    } else {
      toast.info('Logout cancelled.');
    }
  };

  return (
    <div className="container-fluid g-0 navtop-container">
      <div className="row">
        <div className="col-lg-12 p-0">
          <div className="nav-wrapper d-flex justify-content-between align-items-center">
            {/* Centered Navigation Options */}
            <div className="nav-options d-flex justify-content-center">
              <Link to="/dashboard" className="nav-link dashboard">
                <i className="fas fa-tachometer-alt nav-icon" />
                <span>Dashboard</span>
              </Link>
              <Link to="/lottery-markets" className="nav-link create-lottery">
                <i className="fas fa-ticket-alt nav-icon" />
                <span>Create Lottery</span>
              </Link>
                {/* New LuckyHour link */}
                <Link to="/lucky-hour" className="nav-link lucky-hour">
                <i className="fas fa-clock nav-icon" />
                <span>Lucky Hour </span>
              </Link>
              <Link to="/results" className="nav-link results blink">
                <i className="fas fa-trophy nav-icon" style={{ textDecoration: 'none' }} />
                <span>Results</span>
              </Link>
              <Link to="/win" className="nav-link win">
                <i className="fas fa-money-bill-wave nav-icon" />
                <span>Win</span>
              </Link>
              <Link to="/purchase-history" className="nav-link purchase-history">
                <i className="fas fa-history nav-icon" />
                <span>Purchase History</span>
              </Link>
              <Link to="/search-lottery" className="nav-link search-lottery">
                <i className="fas fa-search nav-icon" />
                <span>Search Lottery</span>
              </Link>
            </div>

            {/* Profile and Logout */}
            <div className="profile_info d-flex align-items-center mx-4">
              <i className="fas fa-user-circle" style={{ fontSize: '30px', color: '#4682B4' }} aria-hidden="true" />
              <div className="profile_info_iner">
                <div className="profile_author_name">
                  <p>Role: {store.admin.roles}</p>
                  <h5>{store.admin.userName}</h5>
                </div>
                <div className="profile_info_details">
                  <a href="#" onClick={handleLogout}>
                    Log Out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavTop;
