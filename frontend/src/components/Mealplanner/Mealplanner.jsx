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
        <section className="controls">
          <input
            type="number"
            placeholder="Calories (e.g. 2000)"
            onChange={handleChange}
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
