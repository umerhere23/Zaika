import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchUserRecipes } from '../Service/api';
import { useLocation, Navigate } from 'react-router-dom';

const UserRecipes = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const userName = location.state?.userName;

  useEffect(() => {
    if (userName) {
      fetchUserRecipesData(userName);
    }
  }, [userName]); // Include userName in the dependency array

  const fetchUserRecipesData = async (userName) => {
    try {
      const recipes = await fetchUserRecipes(userName);
      setUserRecipes(recipes);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch user recipes');
    }
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem('userToken');
    return !!token;
  };

  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="container py-5">
        {userRecipes.length > 0 ? (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <h2>Your Recipes: {userName}</h2>
                <ul>
                  {userRecipes.map((recipe) => (
                    <li key={recipe._id}>{recipe.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <p>No recipes found for the user. Your Recipes: {userName}</p>
        )}
        <div className="flex justify-center mt-4 btnedit">
          {/* Add your button or edit functionality here */}
        </div>
      </div>
      <footer className="bg-dark text-white p-5">
        {/* Your footer content */}
      </footer>
    </>
  );
};

export default UserRecipes;
