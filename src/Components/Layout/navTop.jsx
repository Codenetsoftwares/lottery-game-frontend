import React from "react";

const NavTop = () => {
  return (
  
      <div className="container-fluid g-0">
  <div className="row">
    <div className="col-lg-12 p-0">
      <div className="header_iner d-flex justify-content-between align-items-center">
        <div className="sidebar_icon d-lg-none">
          <i className="ti-menu" />
        </div>
        <div className="line_icon open_miniSide d-none d-lg-block">
          <img src="img/line_img.png" alt="Sidebar Icon" />
        </div>

        <div className="header_right d-flex justify-content-between align-items-center">
          
             
    
           
          </div>
          <div className="profile_info d-flex align-items-center">
            <img src="img/client_img.png" alt="Profile" className="rounded-circle" />
            <div className="profile_info_iner">
              <div className="profile_author_name">
                <p>Admin</p>
                <h5>Demo Username</h5>
              </div>
              <div className="profile_info_details">
                <a href="#">My Profile</a>
                <a href="#">Settings</a>
                <a href="#">Log Out</a>
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
