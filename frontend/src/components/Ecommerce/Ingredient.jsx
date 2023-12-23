import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddIngredients } from "../../Service/api.js";
import { Link, useNavigate } from "react-router-dom";
import banner1 from "../img/banner1.png";
import "./CSS/Products.css";
import Footer from "../footer";

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

const IngredientDetail = () => {
  const { id,Quan } = useParams();
  const [quantity, setQuantity] = useState(1);

  const [filteredIngredients, setFilteredIngredients] = useState([]);

  const [ingdetails, setingDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const filtered = ingdetails.filter((ingredient) => ingredient._id === id);
    setFilteredIngredients(filtered);
  }, [ingdetails]);
  const fetchData = async () => {
    try {
      const result = await AddIngredients();
      setingDetails(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = (ingdetails) => {
    console.log(ingdetails.totalProducts)
    if (quantity <= ingdetails.totalProducts) {
      navigate(`/buy/${ingdetails._id}`, {
        state: {
          id: ingdetails._id,
          quantity: quantity,
          image: ingdetails.image,
          price: ingdetails.totalPrice,
          Packame: ingdetails.packName,
          Recpie: ingdetails.recipeName,
          Seller: ingdetails.seller,
          Quantity:ingdetails.totalProducts
        },
      });
    } else {
      alert("Quantity cannot be greater than available quantity.");
    }
  };

  return (
    <>
      <br />
      <br />
      <br /> <br />
      <br />
      <br />
      <div className="row" style={{ marginTop: "7%" }}>
        {filteredIngredients.map((ingredient, index) => (
          <div key={index}>
            <div class="wrapper">
              <div class="banner flex inner">
                <div class="right">
                  <img src={ingredient.image} alt="" srcSet="" />
                  <div className="mask">
                    <div class="d-flex justify-content-start align-items-end h-100">
                      <h5>
                        <span className="badge bg-primary ms-2">New</span>
                        <span className="badge bg-success ms-2">Best</span>
                        <span className="badge bg-danger ms-2">-10%</span>
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="left">
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      class="btn btn-primary p-3"
                      key={ingredient._id}
                      onClick={() => handleClick(ingredient)}
                    >
                      Buy Now
                    </button>
                    <input
                      type="number"
                      className="form-control"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      max={ingredient.totalProducts}
                      style={{ width: "30%" }}
                    />
                  </div>
                  <br />
                  <br />
                  <br />

                  <h5 className="card-title fontdesg" color="black">
                    <b>Pack Name:</b> {ingredient.packName}
                  </h5>

                  <hr />

                  <h5 className="card-title fontdesg" color="black">
                    <b>Recpie Name:</b> {ingredient.recipeName}
                  </h5>
                  <hr />

                  <div>
                    <div className="d-flex justify-content-between">
                      <b>Avilable Quantity: </b>
                      <span> {ingredient.totalProducts}</span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <b>Discount</b>
                      <span>
                        {" "}
                        <strong>{ingredient.discount}%</strong>
                      </span>
                    </div>
                  </div>
                  <p className="card-text">
                    <br />{" "}
                    <b>
                      <i class="fa fa-user" aria-hidden="true"></i>
                    </b>{" "}
                    {ingredient.seller}&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <span class="badge bg-success">
                    Price{" "}
                    <b>
                      <h4>{ingredient.totalPrice}/-</h4>
                    </b>{" "}
                  </span>

                  {/* <b><h4>Price:</h4></b>                  <span><strong></strong><h4>Rs {ingredient.totalPrice}/-</h4> </span>
                </div> */}
                </div>
                <div>
                  {ingredient.ingredients.map(
                    (nestedIngredient, nestedIndex) => (
                      <div key={nestedIndex}>
                        <p>
                          <div className="d-flex justify-content-between">
                            <b>
                              <b>Ingredient :</b> {nestedIngredient.name}
                            </b>
                            <span>
                              {" "}
                              <b>Quantity (G):</b> {nestedIngredient.quantity}
                            </span>
                          </div>
                        </p>
                      </div>
                    )
                  )}
                  <strong>Additinal Details : </strong>
                  {ingredient.details}
                </div>
              </div>
              <hr />
            </div>
            {/* <img src={ingredient.image} alt="" srcSet="" /> */}

            <div className="d-flex justify-content-between"></div>
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br /> <br />
      <br /> <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default IngredientDetail;
