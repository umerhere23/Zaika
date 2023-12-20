import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./img/AddRecipe.css";
import { useLocation } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";

import React, { useState } from "react";
import { onAddRecipe } from "../Service/api";

import Footer from "./footer";

const AddRecipe = () => {
  const location = useLocation();
  const { Username, useremail } = location.state || {};

  const [recipedata, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    image: null,
    timeToCook: "",
    userName: Username || "",
    email: useremail || "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(false); // State to track if the form is submitted
  const {
    name,
    ingredients,
    instructions,
    image,
    timeToCook,
    userName,
    email,
  } = recipedata;
  const handleChange = (e) => {
    setRecipe({ ...recipedata, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64String = event.target.result;
        setRecipe({
          ...recipedata,
          image: imageFile,
          imageString: base64String,
        });
      };

      reader.readAsDataURL(imageFile);
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (name.length < 6) {
      errors.name = "Invalid name format";
    }

    if (!ingredients.trim()) {
      errors.ingredients = "ingredients is required";
    } else if (ingredients.length < 6) {
      errors.ingredients = "ingredients must be at least 6 characters long";
    }

    if (!instructions.trim()) {
      errors.instructions = "instructions is required";
    }

    if (!timeToCook.trim()) {
      errors.timeToCook = "timeToCook is required";
    }

    if (!userName.trim()) {
      errors.userName = "userName is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const addDetails = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const basePath = "./img"; // Replace with your desired path
      const fileName = `${recipedata.name.replace(/\s+/g, "_")}.png`; // Using the recipe name as the filename
      const imagePath = `${basePath}/${fileName}`;

      const imageBlob = recipedata.image;
      const reader = new FileReader();

      reader.readAsDataURL(imageBlob);

      reader.onloadend = () => {
        const base64String = reader.result;
        // Save the base64 string to Local Storage
        localStorage.setItem(imagePath, base64String);
      };
      console.log(`Image "${fileName}" saved to Local Storage`);

      await onAddRecipe(recipedata);

      setIsSubmitted(true);
    }
  };

  return (
    <>
      <div className="container1">
        {isSubmitted ? ( // Display the greeting message if form is submitted
          <div className="text-center">
            <h2>Thank you for your submission!</h2>
            <p>Your recipe has been added.</p>
            <button className="btn btn-primary">
              {" "}
              <a href="/dashboard">Save Changes</a>
            </button>
          </div>
        ) : (
          <form>
            <h2>Add Recipe</h2>
            <div className="form-group">
              <label>Name of recipe:</label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                name="name"
                value={name}
                onChange={(e) => handleChange(e)}
                required
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div class="form-group">
              <label>Step to make ingredients:</label>
              <textarea
                class={`form-control ${errors.ingredients ? "is-invalid" : ""}`}
                name="ingredients"
                value={ingredients}
                onChange={(e) => handleChange(e)}
                required
              />
              {errors.ingredients && (
                <div class="invalid-feedback">{errors.ingredients}</div>
              )}
            </div>

            <div class="form-group">
              <label>instructions:</label>
              <textarea
                class={`form-control ${
                  errors.instructions ? "is-invalid" : ""
                }`}
                name="instructions"
                value={instructions}
                onChange={(e) => handleChange(e)}
                required
              />
              {errors.instructions && (
                <div class="invalid-feedback">{errors.instructions}</div>
              )}
            </div>
            <div class="form-group">
              <label>Time to cook:(mins)</label>
              <input
                type="number"
                class={`form-control ${errors.timeToCook ? "is-invalid" : ""}`}
                name="timeToCook"
                value={timeToCook}
                onChange={(e) => handleChange(e)}
                required
              />
              {errors.timeToCook && (
                <div class="invalid-feedback">{errors.timeToCook}</div>
              )}
            </div>

            <div class="form-group">
              <label>Picture:</label>
              <input
                type="file"
                class={`form-control-file ${errors.image ? "is-invalid" : ""}`}
                name="image"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
              />
              {errors.image && (
                <div class="invalid-feedback">{errors.image}</div>
              )}
            </div>
            {image && (
              <div>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Recipe"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            )}
            <div class="form-group">
              <label>User name:</label>
              <input
                type="text"
                class={`form-control ${errors.userName ? "is-invalid" : ""}`}
                name="userName"
                value={userName}
                onChange={(e) => handleChange(e)}
                required
                disabled
              />
              {errors.userName && (
                <div class="invalid-feedback">{errors.userName}</div>
              )}
            </div>
            <div class="form-group">
              <label>Email:</label>
              <input
                type="email"
                class={`form-control ${errors.email ? "is-invalid" : ""}`}
                name="email"
                value={email}
                onChange={(e) => handleChange(e)}
                required
                disabled
              />
              {errors.email && (
                <div class="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <br />
            <div className="form-group">
              <button
                className="btn btn-primary1"
                onClick={(e) => addDetails(e)}
              >
                Apply
              </button>
            </div>
          </form>
        )}
      </div>
      <br />
      <Footer />
    </>
  );
};

export default AddRecipe;
