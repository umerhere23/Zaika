import { Link } from "react-router-dom";
import './img/style.css';
import logo from './img/logo.png';
import './img/style.css';

const Navbar=()=>{
    return(
        <>
        {/* <nav>
          <div>
        <Link to='./home' class='navhead selected' >Home</Link>
        <Link to='./recipe'class='navhead' >Recipe</Link>
        <Link to='./home' class='navhead'>Home</Link>
        <Link to='./recipe'class='navhead' >Recipe</Link>
        <Link to='./recipe' class='navhead'>Recipe</Link></div>
        </nav> */}
       

<nav class="navbar navbar-expand-lg navbar bg-dark " >
  <div class="container-fluid bg-dark">
  <img src={logo} alt="Logo" className='logo' />
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
        <Link to="/home" className="nav-link active" aria-current="page">Home</Link>
        </li>
        <li class="nav-item">
        <Link to="./recipe" className="nav-link active" aria-current="page">Recipe</Link>

        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="./login" tabindex="-1" aria-disabled="true">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="./AboutUS" tabindex="-1" aria-disabled="true">AboutUS</a>
        </li>
       
      </ul>
    </div>
  </div>
</nav>

        </>
    );
}
export default Navbar;