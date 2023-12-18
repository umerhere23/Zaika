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
import AdminDasboard from './components/AdminDasboard.jsx';
import RecipeDetails from './components/RecipeDetails.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import MealPlanner from './components/Mealplanner/Mealplanner.jsx';
import DietMealplanner from './components/Mealplanner/DietMealplanner.jsx';
import EComHome from './components/Ecommerce/EComHome.jsx';
const App=()=>{

  return(
    <>
<Navbar />   

<Routes>
  <Route path="/home" element={<Home />}  />
  <Route path="/recipe" element={<Recipe />}  />
  <Route path="/signup" element={<Signup />}  />
  <Route path="/login" element={<Login />}  />
  <Route path="/AddRecpie/:id" element={<AddRecipe />}  />
  <Route path="/aboutUS" element={<AboutUS />}  />
  <Route path="/dashboard" element={<Dashboard />}  />
  <Route path="/recipes/:id" element={<RecipeDetails />} />

  <Route path="/UserRecipes" element={<UserRecipes />} />
  <Route path="/AdminLogin" element={<AdminLogin />} />

<Route path='/AdminDasboard' element={<AdminDasboard/>}/>
<Route path='/Mealplanner' element={<MealPlanner/>}/>
<Route path='/MealPlanners' element={<DietMealplanner/>}/>
<Route path='/Ecomerce' element={<EComHome/>}/>

</Routes>


    </>
  );
}
export default App;