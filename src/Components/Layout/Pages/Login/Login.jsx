/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import backgroundimage from "../../../../Assets/backgroundImage.jpg";

const Login = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Image Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(5px)",
        }}
      ></div>

      <div className="col-lg-12">
        <div
          className="white_box mb_30"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div
                className="modal-content cs_modal"
                style={{
                  borderRadius: "10px",
                  border: "1px solid black",
                }}
              >
                <div
                  className="modal-header justify-content-center theme_bg_1"
                  style={{
                    backgroundColor: "#4682B4",
                    borderRadius: "10px 10px 0 0",
                    padding: "15px",
                  }}
                >
                  <h5
                    className="modal-title text_white"
                    style={{ color: "white" }}
                  >
                    Log in
                  </h5>
                </div>
                <div className="modal-body" style={{ padding: "30px" }}>
                  <form>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Username"
                        style={{
                          padding: "15px",
                          borderRadius: "5px",
                          border: "1px solid",
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        style={{
                          padding: "15px",
                          borderRadius: "5px",
                          border: "1px solid",
                        }}
                      />
                    </div>
                    <a
                      href="#"
                      className="btn_1 full_width text-center"
                      style={{
                        color: "white",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "block",
                        width: "100%",
                        textDecoration: "none",
                      }}
                    >
                      Log in
                    </a>

                    <div className="text-center">
                      <a
                        href="#"
                        data-toggle="modal"
                        data-target="#forgot_password"
                        data-dismiss="modal"
                        className="pass_forget_btn"
                        style={{
                          color: "#4682B4",
                          textDecoration: "underline",
                        }}
                      >
                        Forget Password?
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
