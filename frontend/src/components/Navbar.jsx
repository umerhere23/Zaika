import { Link } from "react-router-dom";
import "./img/nav.css";
import logo from "./img/zaika.png";
import "./img/style.css";

const Navbar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar  ">
        <div class="container-fluid ">
          <a href="/home">
            <img src={logo} alt="Logo" className="logo" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a href="/home" className="nav-link ">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a href="/recipe" className="nav-link ">
                  Recipe
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/Mealplanner">
                  MealPlanner
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link "
                  href="/login"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Login
                </a>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link "
                  href="/AboutUS"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  AboutUS
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
