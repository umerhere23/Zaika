import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchUserRecipes } from "../Service/api";
import { useLocation, Navigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import Footer from "./footer";

const UserRecipes = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const userName = location.state?.userName;

  useEffect(() => {
    if (userName) {
      fetchUserRecipesData(userName);
    }
  }, [userName]);

  const fetchUserRecipesData = async (userName) => {
    try {
      const recipes = await fetchUserRecipes(userName);
      setUserRecipes(recipes);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch user recipes");
    }
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem("userToken");
    return !!token;
  };

  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="text-center mb-4">Your Recipes: {userName}</h2>
            {userRecipes.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Ingredients</th>
                    <th>Instructions</th>
                  </tr>
                </thead>
                <tbody>
                  {userRecipes.map((recipe) => (
                    <tr key={recipe._id}>
                      <td>{recipe.name}</td>
                      <td>{recipe.ingredients}</td>
                      <td>{recipe.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-center">No recipes found for the user.</p>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-4 btnedit"></div>
      </div>
      <Footer />
    </>
  );
};

export default UserRecipes;
