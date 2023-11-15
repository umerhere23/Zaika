import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './img/Recipe.css';
import a2 from './img/a2.webp';
import b3 from './img/b3.jpg';
import img4 from './img/img4.jpg';
import Footer from './footer';
import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../Service/api';

const Recipe = () => {
    const [recipedetails, setRecipeDetails] = useState([]);

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
    }

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
    <h1>Avilable Recpies</h1>
    <div class="alert alert-warning " role="alert">
    <p className='msg'>Zaika Recipes is a proposed website that aims to provide a platform for food lovers to access and share recipes. The website will include an extensive collection of recipes from various cuisines and cultures. The main objective of the website is to provide a user-friendly interface that allows users to search, explore, share their favourite recipes and delivery of food.</p>
</div>
                <div className="row">
                    {recipedetails.map(details => (
                        <div className="col-md-3 mb-2 box" key={details._id}>
<div className="card" style={{ width: '300px', height: '350px',  }}>

                                <div className="card-body">
                                <img src={details.image} alt={`Recipe: ${details.name}`} className="card-img-top" />

                                    <h5 className="card-title">Name: {details.name}</h5>
                                    <p className="card-text">User Name: {details.userName}</p>
                                    <p className="card-text">Ingredients: {details.ingredients}</p>
                                    <p className="card-text">Instructions: {details.instructions}</p>
                                    <p className="card-text">Time to Cook: {details.timeToCook}</p>
                                    <p className="card-text">Email: {details.email}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Recipe;
