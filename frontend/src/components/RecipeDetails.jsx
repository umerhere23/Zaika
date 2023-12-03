import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const { recipeName, userName, ingredients, instructions, timeToCook, email } = location.state || {};

  return (
    <div className="container mt-4">
      <h1>Recipe ID: {id}</h1>
      <h2>{recipeName}</h2>
      <p>User Name: {userName}</p>
      <p>Ingredients: {ingredients}</p>
      <div>
        <h5>Instructions:</h5>
        <ol>
          {instructions &&
            instructions.split(',').map((step, index) => (
              <li key={index}>{step.trim()}</li>
            ))}
        </ol>
      </div>
      <p>Time to Cook: {timeToCook}</p>
      <p>Email: {email}</p>

      {id && <p>Recipe ID from Recipe component: {id}</p>}
    </div>
  );
};

export default RecipeDetails;
