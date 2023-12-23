import React, { useEffect, useState } from "react";
import { AddIngredients, createUpperAPI } from "../../Service/api.js";
import Footer from "../footer";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { MDBTypography } from "mdb-react-ui-kit";
import banner from "../img/img2.webp";
import "../Ecommerce/CSS/Ecommerce.css";
import "../Ecommerce/CSS/ecommerce-category-product.css";
import Divider from "@mui/material/Divider";

const EComHome = () => {
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const navigate = useNavigate();
  const [ingdetails, setIngDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = ingdetails.filter(
      (ingredient) => ingredient.seller.length > 0
    );
    setFilteredIngredients(filtered);
    setSearchResults(filtered);
  }, [ingdetails]);

  const fetchData = async () => {
    try {
      const result = await AddIngredients();
      setIngDetails(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = (ingredient) => {
    navigate(`/ingredient/${ingredient._id}`, {
      state: {
        id: ingredient._id,
        Quan:ingredient.totalProducts
      },
    });
  };

  useEffect(() => {
    const filtered = ingdetails.filter(
      (ingredient) =>
        ingredient.seller.length > 0 &&
        (ingredient.packName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
          ingredient.recipeName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()))
    );
    setSearchResults(filtered);
  }, [ingdetails, searchQuery]);

  return (
    <>
      <div class="wrapper">
        <div class="banner flex inner">
          <div class="right">
            <MDBTypography tag="h2" id="heading" className="mb-0 text-center">
              <b>Ingredients E-Store</b>
            </MDBTypography>
            <h4>
              {" "}
              Providing Ingredients <br /> Grab Your Discount &nbsp;
              <span class="code">NewUser@</span>
            </h4>
            <p>
              At Zaika Recipes, we understand the joy of sharing your culinary
              creations with others. Our platform fosters a vibrant community of
              food enthusiasts who can not only access recipes but also share
              their own. Join the community, share your unique recipes, and
              connect with fellow food lovers.
            </p>
            <nav className=" text-center py-3">
              <div className="container">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Search by packName or recipeName"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <button
                    className="btn btn-primary  h-51"
                    type="button"
                    style={{ height: "46px" }}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>

              <marquee
                behavior="scroll"
                direction="left"
                className="text-white"
              >
                <b>Get 10% Flat off On All Products</b>
              </marquee>
            </nav>
          </div>
          <div class="left">
            <img src={banner} alt="" srcset="" />
          </div>
        </div>
        <hr />
      </div>
      <Divider>
        <b>Avilable Ingredient</b>
      </Divider>
      <div className="container mt-5">
        <div className="row">
          <div className="container mt-5">
            <div className="row">
              {searchResults.map((ingredient, index) => (
                <div key={index} className="col-md-4 mb-3">
                  <div key={index} className="col-md-4 mb-3">
                    <MDBCard>
                      <div className="card-body">
                        <img src={ingredient.image} alt="" srcSet="" />
                        <hr />

                        <h5 className="card-title">
                          Pack Name : {ingredient.packName}
                        </h5>
                        <h6 className="card-title" color="black">
                          <b>Recpie Name:</b> {ingredient.recipeName}
                        </h6>
                        <hr />
                        <p className="card-text">
                          <b>Quantity:</b> {ingredient.totalProducts}
                          ,&nbsp;&nbsp;&nbsp;&nbsp; <b>Price:</b>{" "}
                          {ingredient.totalPrice}
                          <br />
                          <i class="fa fa-user" aria-hidden="true"></i>{" "}
                          <b>Seller:</b> {ingredient.seller}
                          &nbsp;&nbsp;&nbsp;&nbsp; <b>Discount</b>{" "}
                          {ingredient.discount}%
                        </p>
                        {/* {ingredient.ingredients.map((nestedIngredient, nestedIndex) => (
          <div key={nestedIndex}>
            <p>
              <b>Ingredient :</b> {nestedIngredient.name}
            </p>
          </div>
        ))} */}
        {ingredient.totalProducts === 0 ? (
                    <button className="btn btn-primary" type="button" disabled>
                      Out Of Stock
                    </button>
                  ) : (
                    <div className="d-flex justify-content-between">
                      <button
                        onClick={() => handleClick(ingredient)}
                        className="btn btn-primary"
                        type="button"
                      >
                        Details
                      </button>
                    </div>
                  )}
                        
                          {/* <Link to={`/ingredient/${ingredient._id.$oid}`} className="btn btn-primary">Details</Link> */}
                       
                      </div>
                    </MDBCard>
                  </div>
                </div>
              ))}
            </div>{" "}
          </div>
        </div>{" "}
      </div>

      <br />
      <br />
      <Footer />
    </>
  );
};

export default EComHome;
