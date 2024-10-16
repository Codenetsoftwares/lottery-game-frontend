/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import backgroundimage from "../../.././Assets/backgroundImage.jpg";
import { useNavigate } from "react-router-dom";
import { adminLogin, login } from "../../../Utils/apiService";
import { useAppContext } from "../../../contextApi/context";
import strings from "../../../Utils/constant/stringConstant";

const Login = () => {
  const { dispatch } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error handling
  const navigate = useNavigate();

  console.log(dispatch);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError(""); // Clear previous errors

  //   const response = await adminLogin({
  //     userName: username,
  //     password: password,
  //   });

  //   if (response && response.success) {
  //     dispatch({ type: "LOG_IN", payload: response.data });

  //     navigate("/lottery-markets");
  // window.location.reload();
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const response = await adminLogin({
      userName: username,
      password: password,
    });
    console.log("===>>> response", response);

    if (response && response.success) {
      // Immediately store the accessToken in local storage
      localStorage.setItem(
        strings.LOCAL_STORAGE_KEY,
        JSON.stringify({
          admin: {
            accessToken: response.data.accessToken,
            // Add other properties if needed
          },
        })
      );
      // Dispatch the login action with accessToken as payload
      dispatch({
        type: strings.LOG_IN,
        payload: response.data, // Assuming `response.data` contains the token and user details
      });

      // Navigate to the desired route after successful login
      navigate("/lottery-markets");
    } else {
      // Handle login failure
      setError(response?.errMessage || "Login failed");
    }
  };
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
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn_1 full_width text-center"
                      style={{
                        color: "white",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "block",
                        width: "100%",
                        textDecoration: "none",
                      }}
                      onClick={handleLogin} // Properly attaching the handleLogin function
                    >
                      Log in
                    </button>

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
