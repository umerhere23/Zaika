import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./img/Recipe.css";
import a2 from "./img/a2.webp";
import b3 from "./img/b3.jpg";
import img4 from "./img/img4.jpg";
import Footer from "./footer";
import { Link, useNavigate } from "react-router-dom";
import banner1 from "./img/banner1.png";

import React, { useEffect, useState } from "react";
import { fetchRecipes } from "../Service/api";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "../components/CSS/Style.css";

const Recipe = () => {
  const [recipedetails, setRecipeDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
console.log(recipedetails)
  const fetchData = async () => {
    try {
      const result = await fetchRecipes();
      setRecipeDetails(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredRecipes = recipedetails.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (filteredRecipes.length === 0 && searchTerm.trim() !== "") {
      toast.error("No recipes found for the entered keyword.", {
        autoClose: 1000,
      });
    }
  }, [filteredRecipes, searchTerm]);
  const handleRecipeClick = (details) => {
    navigate(`/recipes/${details._id}`, {
      state: {
        recipeName: details.name,
        id_: details._id,
        userName: details.userName,
        ingredients: details.ingredients,
        instructions: details.instructions,
        timeToCook: details.timeToCook,
        email: details.email,
        Recpimage: details.image,
      },
    });
  };
  return (
    <>
      <div class="wrapper">
        <div class="banner flex inner">
          <div class="right">
            <h1>Discover</h1>
            <h2>The New</h2>
            <h3>Recpies Here!</h3>
            <h4>
              Aloso Providing Ingredients <br /> Grab Your Discount &nbsp;
              <span class="code">NewUser@</span>
            </h4>
            <p>
              At Zaika Recipes, we understand the joy of sharing your culinary
              creations with others. Our platform fosters a vibrant community of
              food enthusiasts who can not only access recipes but also share
              their own. Join the community, share your unique recipes, and
              connect with fellow food lovers.
            </p>
            <button class="btn btn1">
              {" "}
              <a class="txtd" href="/login">
                Become User
              </a>{" "}
            </button>
            <button class="btn btn1">
              <a class="txta" href="/aboutUS">
                Read More
              </a>
            </button>
          </div>
          <div class="left">
            <img src={banner1} alt="" srcset="" />
          </div>
        </div>
        <hr />
      </div>
      <br />
      <br />

      <section style={{ backgroundColor: "#eee" }}>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />

        <div class="alert alert-warning " role="alert">
          <p className="msg">
            Zaika Recipes is a proposed website that aims to provide a platform
            for food lovers to access and share recipes. The website will
            include an extensive collection of recipes from various cuisines and
            cultures. The main objective of the website is to provide a
            user-friendly interface that allows users to search, explore, share
            their favourite recipes and delivery of food.
          </p>
        </div>
        <h1 className="fontsa">Available Recpies</h1>
        <div
          className="input-group mb-3 "
          style={{ width: "30%", marginLeft: "30%" }}
        >
          <label htmlFor="recipeSearch" className="visually-hidden">
            Search by Recipe Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="recipeSearch"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Recipe Name"
            aria-label="Search by Recipe Name"
            aria-describedby="searchIcon"
          />
          <button
            className="btn btn-primary"
            type="button"
            id="searchIcon"
            style={{ height: "46px" }}
            onClick={() => toast("Recipe Found", { autoClose: 1000 })}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="container py-5">
          <div className="row">
            {filteredRecipes.map((details) => (
              <div
                className="col-md-4 mb-4"
                key={details._id}
                onClick={() => handleRecipeClick(details)}
              >
                <div
                  className="card h-100 "
                
                >
                  <img
                    src={details.image}
                    className="card-img-top"
                    alt="Laptop"
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <p className="small">
                        <a href="#!" className="text-muted">
                          {details.name}
                        </a>
                      </p>
                      <p className="small text-danger">
                        <i className="fa fa-user" aria-hidden="true"></i>:{" "}
                        {details.userName}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <p className="text-muted mb-0">
                        Time To Cook:{" "}
                        <span className="fw-bold">{details.timeToCook}</span>
                      </p>
                      <div className="ms-auto text-warning">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ToastContainer />

      <Footer />
    </>
  );
};

export default Recipe;
