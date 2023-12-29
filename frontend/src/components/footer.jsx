import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./img/style.css";

const Footer = () => {
  return (
    <footer className=" text-white p-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              Zaika Recipes is a proposed website that aims to provide a
              platform for food lovers to access and share recipes. The website
              will include an extensive collection of recipes from various
              cuisines and cultures. The main objective of the website is to
              provide a user-friendly interface that allows users to search,
              explore, share their favourite recipes and delivery of food.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/home">Home</a>
              </li>
              {/* <li>
                <a href="#">Services</a>
              </li> */}
              
              <li>
                <a href="/Mealplanner">Mealplanner</a>
              </li>
              <li>
                <a href="/signup">Signup</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/AdminLogin">AdminLogin</a>
              </li>
              <li>
                <a href="aboutUS">AboutUs</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <address>
              <p>Cui atd</p>
              <p>Abbottabad, Pakistan</p>
              <p>Email: omerjh5004@gamil.com</p>
            </address>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row">
          <div className="col-md-6">
            <p>&copy; {new Date().getFullYear()} Zaika(The Recipie)</p>
          </div>
          <div className="col-md-6">
            <ul className="list-inline float-md-end">
              <li className="list-inline-item">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="list-inline-item">
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
