import React from 'react';
import a2 from './img/a2.webp';
import b3 from './img/b3.jpg';
import img4 from './img/img4.jpg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './img/style.css';
import Footer from './footer';

const Aboutus = () => {
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
      <div class="alert alert-warning" role="alert">
  <h4 class="alert-heading">Welcome to About Us of Zaika</h4>
  <p>Zaika is more than just a food platform. We are passionate about bringing people together through the love of food. Our journey began with a simple idea: to create a space where food enthusiasts from around the world can share their culinary creations, connect with one another, and embark on a gastronomic adventure.</p>
<hr></hr>
  <p class="mb-0">At Zaika, we believe that food is a universal language that transcends borders and cultures. Whether you're a seasoned chef or an amateur cook, Zaika welcomes you to explore, experiment, and share your unique flavors with the world. Join us in celebrating the diversity of cuisines, the joy of cooking, and the delight of savoring every bite. Bon appétit!</p>
</div>
<div class="accordion" id="aboutUsAccordion">
  <div class="accordion-item">
    <h2 class="accordion-header" id="purposeHeading">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#purposeCollapse" aria-expanded="true" aria-controls="purposeCollapse">
        Purpose of the Website
      </button>
    </h2>
    <div id="purposeCollapse" class="accordion-collapse collapse show" aria-labelledby="purposeHeading">
      <div class="accordion-body">
        <strong>Welcome to Zaika!</strong> Our website's primary purpose is to provide a platform for food enthusiasts to share and explore a wide variety of recipes, connect with like-minded individuals, and celebrate the joy of cooking and dining.
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="developersHeading">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#developersCollapse" aria-expanded="false" aria-controls="developersCollapse">
        Our Developers
      </button>
    </h2>
    <div id="developersCollapse" class="accordion-collapse collapse" aria-labelledby="developersHeading">
      <div class="accordion-body">
        <strong>Meet the Team Behind Zaika!</strong> Our dedicated team of developers has worked tirelessly to bring this platform to life. We are passionate about food and technology, and we hope you enjoy using Zaika as much as we enjoyed creating it.
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="thanksHeading">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#thanksCollapse" aria-expanded="false" aria-controls="thanksCollapse">
        Thank You for Visiting
      </button>
    </h2>
    <div id="thanksCollapse" class="accordion-collapse collapse" aria-labelledby="thanksHeading">
      <div class="accordion-body">
        <strong>We Appreciate Your Visit!</strong> We want to express our gratitude for choosing Zaika. Your support and interest in our platform mean the world to us. We look forward to serving you with more delicious recipes and culinary inspiration.
      </div>
    </div>
  </div>
</div>

      <Footer />
      

    </>
  );
};

export default Aboutus;