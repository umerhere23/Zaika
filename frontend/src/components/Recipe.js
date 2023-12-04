import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './img/Recipe.css';
import a2 from './img/a2.webp';
import b3 from './img/b3.jpg';
import img4 from './img/img4.jpg';
import Footer from './footer';
import { Link, useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../Service/api';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import "../components/CSS/Style.css"
const Recipe = () => {
  const [recipedetails, setRecipeDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch recipes and set the state with the data
      const result = await fetchRecipes();
      setRecipeDetails(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredRecipes = recipedetails.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Show toast when no recipes are found
    if (filteredRecipes.length === 0 && searchTerm.trim() !== '') {
      toast.error('No recipes found for the entered keyword.',{ autoClose: 1000 });
    }
  }, [filteredRecipes, searchTerm]);
  const handleRecipeClick = (details) => {
    navigate(`/recipes`, {
      state: {
        recipeName: details.name,
        id_: details._id,  

        userName: details.userName,
        ingredients: details.ingredients,
        instructions: details.instructions,
        timeToCook: details.timeToCook,
        email: details.email,
      }
    });
    
  };
    return (
        <>
       

        <div className="carousel-container">
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img src={a2} className="d-block w-100" alt="..." />
              <div className="carousel-caption">
                <h3>Zaika</h3>
                <p>Zaika Recipes is a proposed website that aims to provide a platform for food lovers to access and share recipes. The website will include an extensive collection of recipes from various cuisines and cultures. The main objective of the website is to provide a user-friendly interface that allows users to search, explore, share their favourite recipes and delivery of food.</p>
                <button type="button" className="btn btn-primary">Contac Us</button>
                <button type="button" className="btn btn-primary">About Us</button>

              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src={b3} className="d-block w-100" alt="..." />
              <div className="carousel-caption">
                <h3>Zaika</h3>
                <p>Zaika Recipes is a proposed website that aims to provide a platform for food lovers to access and share recipes. The website will include an extensive collection of recipes from various cuisines and cultures. The main objective of the website is to provide a user-friendly interface that allows users to search, explore, share their favourite recipes and delivery of food.</p>
                <button type="button" className="btn btn-primary">Contac Us</button>
                <button type="button" className="btn btn-primary">About Us</button>
              </div>
            </div>
            <div className="carousel-item">
              <img src={img4} className="d-block w-100" alt="..." />
              <div className="carousel-caption">
                <h3>Zaika</h3>
                <p>Zaika Recipes is a proposed website that aims to provide a platform for food lovers to access and share recipes. The website will include an extensive collection of recipes from various cuisines and cultures. The main objective of the website is to provide a user-friendly interface that allows users to search, explore, share their favourite recipes and delivery of food.</p>
                <button type="button" className="btn btn-primary">Contac Us</button>
                <button type="button" className="btn btn-primary">About Us</button>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    <div>
    <h1 className='fonts'>Avilable Recpies</h1>
    <div class="alert alert-warning " role="alert">
    <p className='msg'>Zaika Recipes is a proposed website that aims to provide a platform for food lovers to access and share recipes. The website will include an extensive collection of recipes from various cuisines and cultures. The main objective of the website is to provide a user-friendly interface that allows users to search, explore, share their favourite recipes and delivery of food.</p>
</div>
<div className="row">
<div className="input-group mb-3 " style={{width:"30%",marginLeft:"30%"}}>
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
          style={{height:"46px"}}

          onClick={() => toast('Recipe Found', { autoClose: 1000 })}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>


          <ToastContainer />
<br></br>          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
<div className="row">
  {filteredRecipes.map((details) => (
    <div className="col-md-4 mb-4" key={details._id} onClick={() => handleRecipeClick(details)}>
      <div className="card h-100">
        <img src={details.image} alt={`Recipe: ${details.name}`} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{details.name}</h5>
          <p className="card-text">User: {details.userName}</p>
          <p className="card-text">ID: {details._id}</p>
        </div>
      </div>
    </div>
  ))}
</div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Recipe;