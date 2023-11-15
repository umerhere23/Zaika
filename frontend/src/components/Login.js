import React, { useState } from "react";
import { loginApi } from '../Service/api';
import Footer from './footer';
import Dashboard from "./Dashboard";

import {
  MDBContainer,
  MDBTabs,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Define the error state

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    try {
      const response = await loginApi({ email, password });

      if (response.message === "Login successful") {
        console.log("Authentication successful");
        console.log("Login Details:", response);

      } else {
        setError(response.message || "Authentication failed.");
      }
    } catch (err) {

      console.error("Error:", err);
      setError("An error occurred during authentication.");
     

    }
  };

  return (
    <>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBTabs pills justify className="mb-3 d-flex flex-row justify-content-between"></MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={true}>
            <div className="text-center mb-3">
              <div className="d-flex justify-content-between mx-auto" style={{ width: "40%" }}>
                <MDBBtn tag="a" color="none" className="m-1" style={{ color: "#1266f1" }}>
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>
                {/* Rest of the social login buttons */}
              </div>
              <p>
                Zaika Recipes is a proposed website that aims to provide a platform for food lovers to access and share recipes. The website will include an extensive collection of recipes from various cuisines and cultures. The main objective of the website is to provide a user-friendly interface that allows users to search, explore, share their favorite recipes, and arrange for food delivery.
              </p>
              <h2>Login Form</h2>
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
              {error && <p className="text-danger">{error}</p>}
              <MDBBtn className="mb-4 w-100" type="submit">
                Sign in
              </MDBBtn>
            </form>

            <p className="text-center">
              Not a member? <a href="/signup">Register</a>
            </p>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
      <Footer />
    </>
  );
};

export default Login;
