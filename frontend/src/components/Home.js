import React, { useEffect, useState } from 'react';
import a2 from './img/a2.webp';
import b3 from './img/b3.jpg';
import img4 from './img/img4.jpg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './img/style.css';
import Footer from './footer';

const Home = () => {

  
  return (
    <>
      <div className="carousel-container">
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img src="https://goldbelly.imgix.net/uploads/card/image/934/We-ship-Food-Homepage-Feature-Banner-Template-1.gif?ixlib=rails-3.0.2" className="d-block w-100" alt="..." />
              <div className="carousel-caption">
                <h3>Zaika</h3>
                <p>Zaika Recipes is a proposed website that aims to provide a platform for food lovers to access and share recipes. The website will include an extensive collection of recipes from various cuisines and cultures. The main objective of the website is to provide a user-friendly interface that allows users to search, explore, share their favourite recipes and delivery of food.</p>
                <button type="button" className="btn btn-primary">Contac Us</button>
                <button type="button" className="btn btn-primary">About Us</button>

              </div>
            </div>
            {/* <div className="carousel-item" data-bs-interval="2000">
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
            </div> */}
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
      <h1 id='heading'>Why Choose Us?</h1>
      <div class="boxes flex">
        <div class="card">
          <img src={a2} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Community Engagement:</h5>
            <p className="card-text">
              At Zaika Recipes, we understand the joy of sharing your culinary creations with others. Our platform fosters a
              vibrant community of food enthusiasts who can not only access recipes but also share their own. Join the community,
              share your unique recipes, and connect with fellow food lovers.
            </p>
          </div>
        </div>

        <div class="card">
          <img src={b3} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Recipe Nutrition Information:</h5>
            <p className="card-text">
              For users with specific dietary needs or health goals, we offer detailed nutritional information for every recipe, including calorie counts, protein, carb, and fat content, allowing individuals to make health-conscious meal choices tailored to their requirements.
            </p>
          </div>
        </div>
        <div class="card">
          <img src={b3} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Cooking Tips and Articles: </h5>
            <p className="card-text">
              We understand that cooking is a journey, and to assist users in enhancing their culinary skills and knowledge, we provide a wealth of cooking tips, food-related articles, and instructional videos that cover various aspects of cooking and food preparation.
            </p>
          </div>
        </div>
        <div class="card">
          <img src={img4} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Meal Planner Feature:</h5>
            <p className="card-text">
              To help users stay organized and plan their meals efficiently, we offer a meal planner feature. Users can select recipes for the week and request or purchase a grocery list tailored to their chosen meals, simplifying the meal planning and preparation process.
            </p>
          </div>
        </div>
      </div>
      <Footer />
      

    </>
  );
};

export default Home;