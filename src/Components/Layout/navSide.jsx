import React from "react";
import { Link } from "react-router-dom";

const NavSide = () => {
  return (
    <nav className="sidebar">
      <div className="logo d-flex justify-content-between">
        <a className="large_logo" href="index.html">
          <img src="img/logo.png" alt />
        </a>
        <a className="small_logo" href="index.html">
          <img src="img/mini_logo.png" alt />
        </a>
        <div className="sidebar_close_icon d-lg-none">
          <i className="ti-close" />
        </div>
      </div>
      <ul id="sidebar_menu">
        <li className>
          <a className="has-arrow" href="#" aria-expanded="false">
            <div className="nav_icon_small">
              <img src="img/menu-icon/dashboard.svg" alt />
            </div>
            <div className="nav_title">
              <span> Game Management </span>
            </div>
          </a>
          <ul>
            <li>
              <Link to="/lottery-markets">Lottery Markets</Link>
            </li>
          </ul>
        </li>
        <li className>
          <ul>
            <li>
              <Link to="/Purchased-tickets">Purchased Tickets</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default NavSide;
