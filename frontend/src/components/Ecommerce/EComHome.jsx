import React, { useEffect, useState } from 'react';
import a2 from '../img/a2.webp';
import b3 from '../img/b3.jpg';
import img4 from '../img/img4.jpg';
import banner1 from '../img/banner1.png';
import {addIngredientPack} from '../../Service/api.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../img/style.css';
import Footer from '../footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Ecommerce/CSS/Ecommerce.css';

import {
    MDBCard,
    MDBContainer

 
  } from "mdb-react-ui-kit";
  
const EComHome = () => {

    const [formData, setFormData] = useState({
        recipeId: '',
        ingredients: [
          { name: '', quantity: '', price: '' },
          { name: '', quantity: '', price: '' }
        ],
        seller: '',
        image: '',
      });
    
      const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const newIngredients = [...formData.ingredients];
        newIngredients[index][name] = value;
    
        setFormData({
          ...formData,
          ingredients: newIngredients,
        });
      };
    
      const handleAddIngredient = () => {
        setFormData({
          ...formData,
          ingredients: [...formData.ingredients, { name: '', quantity: '', price: '' }],
        });
      };
    
      const handleRemoveIngredient = (index) => {
        const newIngredients = [...formData.ingredients];
        newIngredients.splice(index, 1);
    
        setFormData({
          ...formData,
          ingredients: newIngredients,
        });
      };

        const handleSubmit = async () => {
            try {
              const result = await addIngredientPack(formData);
              console.log(result);
            } catch (error) {
              console.error('Error:', error.message);
            }
          };
  return (
    <>
  
   <div class="wrapper">
            <div class="banner flex inner">
                <div class="right">
                    <h1>Discover</h1>
                    <h2>The New</h2>
                    <h3>Recpies Here!</h3>
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
      <MDBContainer fluid>
      <MDBCard>

      <div class="boxes flex forming">
      <div className="container mt-5">
      <h2>Add Ingredient Pack</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="recipeId" className="form-label">Recipe ID:</label>
          <input
            type="text"
            className="form-control"
            id="recipeId"
            name="recipeId"
            value={formData.recipeId}
            onChange={(e) => setFormData({ ...formData, recipeId: e.target.value })}
            required
          />
        </div>

        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={`ingredient${index + 1}Name`} className="form-label">Ingredient {index + 1} Name:</label>
            <input
              type="text"
              className="form-control"
              id={`ingredient${index + 1}Name`}
              name="name"
              value={ingredient.name}
              onChange={(e) => handleInputChange(e, index)}
              required
            />

            <label htmlFor={`ingredient${index + 1}Quantity`} className="form-label">Ingredient {index + 1} Quantity:</label>
            <input
              type="number"
              className="form-control"
              id={`ingredient${index + 1}Quantity`}
              name="quantity"
              value={ingredient.quantity}
              onChange={(e) => handleInputChange(e, index)}
              required
            />

            <label htmlFor={`ingredient${index + 1}Price`} className="form-label">Ingredient {index + 1} Price:</label>
            <input
              type="number"
              className="form-control"
              id={`ingredient${index + 1}Price`}
              name="price"
              value={ingredient.price}
              onChange={(e) => handleInputChange(e, index)}
              required
            />

            {index > 0 && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveIngredient(index)}
              >
                Remove Ingredient {index + 1}
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="btn btn-success"
          onClick={handleAddIngredient}
        >
          Add Another Ingredient
        </button>

        <div className="mb-3">
          <label htmlFor="seller" className="form-label">Seller:</label>
          <input
            type="text"
            className="form-control"
            id="seller"
            name="seller"
            value={formData.seller}
            onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL:</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            required
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>

      </div>
      </MDBCard>

      </MDBContainer>

      <br/>
      <br/>

      <Footer />
      

    </>
  );
};

export default EComHome;