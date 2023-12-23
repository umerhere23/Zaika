import React, { useState } from "react";
import MealList from "./Meallist.jsx";
import "./CSS/meal.css";
import Footer from "../footer";
import banner1 from "../img/banner1.png";

function MealPlanner() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=cb1c464d94f142c08b156c5beddade8b&timeFrame=day&targetCalories=${calories}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log("error");
      });
  }

  function handleChange(e) {
    setCalories(e.target.value);
  }

  return (
    <>
      <div class="wrapper">
        <div class="banner flex inner">
          <div class="right">
            <h1>Discover</h1>
            <h2>The New</h2>
            <h3>Recpies Here!</h3>
            <h4>
              Aloso Providing Ingredients <br /> Grab Your Discount &nbsp;
              <span class="code">NewUser@</span>
            </h4>
            <p>
              At Zaika Recipes, we understand the joy of sharing your culinary
              creations with others. Our platform fosters a vibrant community of
              food enthusiasts who can not only access recipes but also share
              their own. Join the community, share your unique recipes, and
              connect with fellow food lovers.
            </p>
            <button class="btn1 btn">
              {" "}
              <a class="txtd" href="/login">
                Become User
              </a>{" "}
            </button>
            <button class="btn1 btn">
              <a class="txta" href="/aboutUS">
                Read More
              </a>
            </button>
          </div>
          <div class="left">
            <img src={banner1} alt="" srcset="" />
          </div>
        </div>
        <hr />
      </div>
      <br />
      <br />
      <hr style={{ height: "1%", color: "#001827;" }} />
      <div className="App">
  
<div class="alert alert-primary d-flex align-items-center" role="alert">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
  <div>
  Calories Must Be Greater then 400 and Less then 3000  </div>
</div>
        <section className="controls">
          <input
            type="number"
            placeholder="Calories (e.g. 2000)"
            onChange={handleChange}
            min={400}
            max={3000}
            style={{width:"140%"}}
          />
          <button className="buttont" onClick={getMealData}>
            Get Daily Meal Plan
          </button>
        </section>
        {mealData && <MealList mealData={mealData} />}
      </div>
      <Footer />
    </>
  );
}

export default MealPlanner;
