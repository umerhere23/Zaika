import Home from './components/Home';
import {Route,Routes} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Recipe from './components/Recipe';
import Signup from './components/Signup';
import Login from './components/Login';
import AddRecipe from './components/AddRecipe';
import AboutUS from './components/AboutUs';
import Dashboard from './components/Dashboard.jsx';
import Recipes from './components/Recipe';
import UserRecipes from './components/UserRecipies.jsx';
import React, { useEffect, useState } from 'react';

import RecipeDetails from './components/RecipeDetails.jsx';
import LoadingSpinner from '../src/components/loading.jsx';

const App=()=>{
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      await new Promise(resolve => setTimeout(resolve, 3200));

      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return(
    <>
<Navbar />   

<Routes>
  <Route path="/home" element={<Home />}  />
  <Route path="/recipe" element={<Recipe />}  />
  <Route path="/signup" element={<Signup />}  />
  <Route path="/login" element={<Login />}  />
  <Route path="/AddRecpie" element={<AddRecipe />}  />
  <Route path="/aboutUS" element={<AboutUS />}  />
  <Route path="/dashboard" element={<Dashboard />}  />
  <Route path="/recipes/:id" element={<RecipeDetails />} />

  <Route path="/UserRecipes" element={<UserRecipes />} />




</Routes>


    </>
  );
}
export default App;