import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from '../Service/api';
import Footer from './footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css/animate.min.css';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsContent, 
  MDBTabsPane,
  MDBInput,
} from "mdb-react-ui-kit";

import Cookies from 'js-cookie'; // Import the js-cookie library

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

  const showSuccessAndNavigate = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 1000,
      onClose: () => navigate("/dashboard", {
        state: {
          userEmail: email
        }
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
    if (response.message === "Login successful") {
      Cookies.set("userToken", response.token, { expires: 1 });
      Cookies.set("userSession", JSON.stringify(response.user), { expires: 1 });
      showSuccessAndNavigate("Login Successful");

      // Disable forward navigation
      window.history.forward = () => false;
    } else {
      showError(response.message || "Authentication failed.");
    }
  } catch (err) {
    showError("An error occurred during authentication.");
  }
};


  return (
    <>

      <MDBContainer className="p-3 my-5 d-flex flex-column w-50 shadow-5-strong rounded-5 animate__animated animate__fadeIn">
        <MDBTabs pills justify className="mb-3 d-flex flex-row justify-content-between"></MDBTabs>
        <MDBTabsContent>
          <MDBTabsPane show={true}>
            <div className="text-center mb-4">
              <h2 className="mb-4">Login Form</h2>
            </div>
            <form onSubmit={handleLogin}>
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary btn-lg w-100 mb-4" type="submit">Sign in</button>
            </form>
            <p className="text-center">
              Not a member? <a href="/signup" className="text-decoration-none">Register</a>
            </p>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Login;
