import React, { useEffect, useState } from 'react';
import a2 from '../img/a2.webp';
import b3 from '../img/b3.jpg';
import img4 from '../img/img4.jpg';
import banner1 from '../img/banner1.png';
import {AddIngredients,createUpperAPI} from '../../Service/api.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../img/style.css';
import Footer from '../footer';
import '../Ecommerce/CSS/Ecommerce.css';
import { Link, useNavigate } from 'react-router-dom';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import "../Ecommerce/CSS/ecommerce-category-product.css";

const EComHome = () => {
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const navigate = useNavigate();


  const [ingdetails, setingDetails] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const filtered = ingdetails.filter((ingredient) => ingredient.seller.length>0 );
    setFilteredIngredients(filtered);
  }, [ingdetails]);
  const fetchData = async () => {
    try {
      const result = await AddIngredients();
      setingDetails(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onViewDetails = (id) => {
    console.log(`Viewing details of ingredient with ID: ${id}`);
  };

  
  const handleClick = (ingdetails) => {
    navigate(`/ingredient/${ingdetails._id}`, {
      state: {
        id: ingdetails._id, 
      
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
                    <h3>Recpies Ingredients!</h3>
                    <h4>Aloso Providing Ingredients <br/>  Grab Your Discount  &nbsp;<span class="code">NewUser@</span></h4>
                    <p>At Zaika Recipes, we understand the joy of sharing your culinary creations with others. Our platform fosters a
              vibrant community of food enthusiasts who can not only access recipes but also share their own. Join the community,
              share your unique recipes, and connect with fellow food lovers.

                    </p>
                    <button class="btn1 btn"> <a  class="txtd"href="/login">Become User</a> </button>
                    <button class="btn1 btn"><a class="txta" href="/aboutUS">Read More</a></button>
                </div>
                <div class="left">
                    <img src={banner1} alt="" srcset=""/>
                </div>
            </div>
            <hr/>
        </div><br/><br/>
      <h1 id='heading'>Ingredients Store</h1>
      <br/>

      <div className="container mt-5">
      <div className="row">
        {filteredIngredients.map((ingredient, index) => (
          <div key={index} className="col-md-4 mb-3">
            <MDBCard>
              <div className="card-body">
                <img src={ingredient.image} alt="" srcSet="" />
                <hr />

                <h5 className="card-title">Pack Name : {ingredient.packName}</h5>
                <h6  className="card-title"color='black'><b>Recpie Name:</b> {ingredient.recipeName}</h6>
                <hr />
                <p className="card-text">
                  <b>Quantity:</b> {ingredient.totalProducts},&nbsp;&nbsp;&nbsp;&nbsp; <b>Price:</b> {ingredient.totalPrice}
                 
                  <br /> <b>Seller:</b> {ingredient.seller}&nbsp;&nbsp;&nbsp;&nbsp; <b>Discount</b> {ingredient.discount}%
                </p>
                {/* {ingredient.ingredients.map((nestedIngredient, nestedIndex) => (
          <div key={nestedIndex}>
            <p>
              <b>Ingredient :</b> {nestedIngredient.name}
            </p>
          </div>
        ))} */}
 <div className="d-flex justify-content-between">
                  <button key={ingredient._id} onClick={() => handleClick(ingredient)} color="primary"  type="button" class="btn btn-primary">Details</button>
                  {/* <Link to={`/ingredient/${ingredient._id.$oid}`} className="btn btn-primary">Details</Link> */}
                </div>
              </div>
            </MDBCard>
            
          </div>
        
        ))}
       
      </div>
    </div>
      <br/>
      <br/>
    
      <Footer />
      

    </>
  );
};

export default EComHome;