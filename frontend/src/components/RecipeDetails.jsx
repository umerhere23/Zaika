import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams();
  const location = useLocation();

 



  // Access recipe details from location state
  const { recipeName, recipeId ,userName,ingredients,instructions,timeToCook,email} = location.state || {};

  return (
    <div>
      <h1>Recipe ID: {id}</h1>
      <h2>{recipeName}</h2>
      <p>User Name: {userName}</p>
      <p>Ingredients: {ingredients}</p>
      <p>Instructions: {instructions}</p>
      <p>Time to Cook: {timeToCook}</p>
      <p>Email: {email}</p>

      {/* Display additional details passed from Recipe component */}
      {recipeId && <p>Recipe ID from Recipe component: {recipeId}</p>}
    </div>
  );
};

export default RecipeDetails;
