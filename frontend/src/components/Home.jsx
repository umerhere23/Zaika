import React, { useEffect, useState } from "react";
import a2 from "./img/a2.webp";
import b3 from "./img/b3.jpg";
import img4 from "./img/img4.jpg";
import banner1 from "./img/banner1.png";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./img/style.css";
import Footer from "./footer";

const Home = () => {

  
  return (
    <>
      <div class="wrapper">
        <div class="banner flex inner">
          <div class="right">
            <h1>Welcome</h1>
            <h2>To The </h2>
            <h3>The ZAIKA !</h3>
            <h4>
              Also Providing Ingredients <br /> Grab Your Discount &nbsp;
              <span class="code">NewUser@</span>
            </h4>
            <p>
              At Zaika Recipes, we understand the joy of sharing your culinary
              creations with others. Our platform fosters a vibrant community of
              food enthusiasts who can not only access recipes but also share
              their own. Join the community, share your unique recipes, and
              connect with fellow food lovers.
            </p>
            <button class="btn1 btn">
              {" "}
              <a class="txtd" href="/Ecomerce">
                Our Store
              </a>{" "}
            </button>
            <button class="btn1 btn">
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
      <h1 id="heading">Why Choose Us?</h1>
      <br />
      <div class="boxes flex">
        <div class="card">
          <img src={a2} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Community Engagement:</h5>
            <p className="card-text">
              At Zaika Recipes, we understand the joy of sharing your culinary
              creations with others. Our platform fosters a vibrant community of
              food enthusiasts who can not only access recipes but also share
              their own. Join the community, share your unique recipes, and
              connect with fellow food lovers.
            </p>
          </div>
        </div>

        <div class="card">
          <img src={b3} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Recipe Nutrition Information:</h5>
            <p className="card-text">
              For users with specific dietary needs or health goals, we offer
              detailed nutritional information for every recipe, including
              calorie counts, protein, carb, and fat content, allowing
              individuals to make health-conscious meal choices tailored to
              their requirements.
            </p>
          </div>
        </div>
        <div class="card">
          <img src={b3} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Cooking Tips and Articles: </h5>
            <p className="card-text">
              We understand that cooking is a journey, and to assist users in
              enhancing their culinary skills and knowledge, we provide a wealth
              of cooking tips, food-related articles, and instructional videos
              that cover various aspects of cooking and food preparation.
            </p>
          </div>
        </div>
        <div class="card">
          <img src={img4} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Meal Planner Feature:</h5>
            <p className="card-text">
              To help users stay organized and plan their meals efficiently, we
              offer a meal planner feature. Users can select recipes for the
              week and request or purchase a grocery list tailored to their
              chosen meals, simplifying the meal planning and preparation
              process.
            </p>
          </div>
        </div>
      </div>
      <br />
      <br />
     
      <Footer />
    </>
  );
};

export default Home;
