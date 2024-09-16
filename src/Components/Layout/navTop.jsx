import React from "react";
import { useAppContext } from "../../contextApi/context";
import strings from "../../Utils/constant/stringConstant";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NavTop = () => {
  const { dispatch, store } = useAppContext();
  console.log("==== Auth from Navtop", store);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch({ type: strings.LOG_OUT });

    window.confirm("Are you sure you want to log out");
    // Show a toast message
    toast.success("Logged out successfully!");

    // Redirect to the login page

    navigate("/");
  };

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

            <div className="header_right d-flex justify-content-between align-items-center"></div>
            <div className="profile_info d-flex align-items-center">
              <i
                className="fas fa-user-circle"
                style={{ fontSize: "30px", color: "#4682B4" }}
                aria-hidden="true"
              />
              <div className="profile_info_iner">
                <div className="profile_author_name">
                  <p> Role: {store.admin.roles}</p>
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
