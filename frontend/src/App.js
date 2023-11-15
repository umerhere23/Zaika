import Home from './components/Home';
import {Route,Routes} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Recipe from './components/Recipe';
import Signup from './components/Signup';
import Login from './components/Login';
import AddRecipe from './components/AddRecipe';
import AboutUS from './components/AboutUs';


const App=()=>{
  return(
    <>
    {/* <h1 className="bg-primary text-danger text-center">Hello this is Zayeka</h1> */}
<Navbar />   

<Routes>
  <Route path="/home" element={<Home />}  />
  <Route path="/recipe" element={<Recipe />}  />
  <Route path="/signup" element={<Signup />}  />
  <Route path="/login" element={<Login />}  />
  <Route path="/AddRecpie" element={<AddRecipe />}  />
  <Route path="/aboutUS" element={<AboutUS />}  />




</Routes>


    </>
  );
}
export default App;