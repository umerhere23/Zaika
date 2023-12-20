import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../Service/api";
import Footer from "./footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css/animate.min.css";
import "../components/CSS/login.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const showError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showSuccessAndNavigate = (message, userEmail, username) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 1000,
      onClose: () =>
        navigate("/dashboard", {
          state: {
            userEmail,
            username,
          },
        }),
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showError("Please provide both email and password.");
      return;
    }

    try {
      const response = await loginApi({ email, password });
      console.log(response.message);

      if (response.message === "Login successful") {
        Cookies.set("userToken", response.token, { expires: 1 });
        Cookies.set("userSession", JSON.stringify(response.user), {
          expires: 1,
        });

        const userData = response.user;
        console.log("Login" + userData.Username);

        if (userData.isBlocked === true) {
          showError("Account is blocked. Please contact support.");
        } else {
          showSuccessAndNavigate("Login Successful", email, userData.Username);
          window.history.forward = () => false;
        }
      } else {
        showError(response.message || "Authentication failed.");
      }
    } catch (err) {
      showError("An error occurred during authentication.");
    }
  };

  return (
    <>
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">User Login</h2>
                <p className="text-white-50 mb-5">
                  Please enter your login and password!
                </p>
                <form onSubmit={handleLogin}>
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    size="lg"
                    className="txtf"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    id="password"
                    className="txtf"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    size="lg"
                  />

                  <button
                    className="btn btn-primary btn-lg w-100 mb-4"
                    color="white"
                    type="submit"
                  >
                    Sign in
                  </button>

                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <a href="/signup" class="text-white-50 fw-bold">
                        Sign Up
                      </a>
                    </p>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Login;
