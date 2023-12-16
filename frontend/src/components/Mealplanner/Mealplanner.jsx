// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Container, Row, Col, Form } from 'react-bootstrap';
// import Footer from '../footer';
// import { addMealPlan, getMealSuggestions } from '../../Service/api.js'; // Assuming you have a getMealSuggestions API
// const MealPlanner = () => {
//   const [userPreferences, setUserPreferences] = useState({
//     goal: '',
//     mealFrequency: '',
//     cuisine: '',
//     allergies: '',
//     favoriteIngredient: '',
//     timeConstraint: '',
//     // Additional fields
//     // Add more fields as needed
//   });

//   const [mealSuggestions, setMealSuggestions] = useState([]);

//   const handleInputChange = (e) => {
//     setUserPreferences({
//       ...userPreferences,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleMealPlanSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Add user preferences to the database
//       const response = await addMealPlan(userPreferences);
//       console.log('Meal Plan Submitted:', response);

//       // Get meal suggestions based on user preferences
//       const suggestions = await getMealSuggestions(userPreferences);
//       setMealSuggestions(suggestions);

//       // Optionally, you can reset the form after successful submission
//       setUserPreferences({
//         goal: '',
//         mealFrequency: '',
//         cuisine: '',
//         allergies: '',
//         favoriteIngredient: '',
//         timeConstraint: '',
//       });
//     } catch (error) {
//       console.error('Error submitting meal plan:', error);
//     }
//   };
//   return (
//     <>
//       <Container className="my-5">
//         <h1 className="mb-4">Meal Planner</h1>
//         <Form onSubmit={handleMealPlanSubmit}>
//           <Row>
//             <Col md={6}>
//               <Form.Group controlId="goal">
//                 <Form.Label>Dietary Goal</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your dietary goal (e.g., weight loss, muscle gain)"
//                   name="goal"
//                   value={userPreferences.goal}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group controlId="mealFrequency">
//                 <Form.Label>Meal Frequency</Form.Label>
//                 <Form.Control
//                   as="select"
//                   name="mealFrequency"
//                   value={userPreferences.mealFrequency}
//                   onChange={handleInputChange}
//                 >
//                   <option value="">Select Meal Frequency</option>
//                   <option value="daily">Daily</option>
//                   <option value="weekly">Weekly</option>
//                   {/* Add more options as needed */}
//                 </Form.Control>
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={6}>
//               <Form.Group controlId="cuisine">
//                 <Form.Label>Preferred Cuisine</Form.Label>
//                 <Form.Control
//                   as="select"
//                   name="cuisine"
//                   value={userPreferences.cuisine}
//                   onChange={handleInputChange}
//                 >
//                   <option value="">Select Preferred Cuisine</option>
//                   <option value="italian">Italian</option>
//                   <option value="mexican">Mexican</option>
//                   {/* Add more options as needed */}
//                 </Form.Control>
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group controlId="allergies">
//                 <Form.Label>Allergies</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter any allergies or dietary restrictions"
//                   name="allergies"
//                   value={userPreferences.allergies}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={6}>
//               <Form.Group controlId="favoriteIngredient">
//                 <Form.Label>Favorite Ingredient</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your Favorite Ingredient"
//                   name="favoriteIngredient"
//                   value={userPreferences.favoriteIngredient}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group controlId="timeConstraint">
//                 <Form.Label>Time Constraint</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter Your Time Constraint"
//                   name="timeConstraint"
//                   value={userPreferences.timeConstraint}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Button variant="primary" type="submit">
//             Generate Meal Plan
//           </Button>
//         </Form>

//         {mealSuggestions.length > 0 && (
//           <div className="mt-4">
//             <h2>Meal Suggestions</h2>
//             <ul>
//               {mealSuggestions.map((meal, index) => (
//                 <li key={index}>{meal.name}</li>
//               ))}
//             </ul>
//           </div> )}
//       </Container>
//       <Footer />
//     </>
//   );
// };

// export default MealPlanner;
import React, { useState } from "react"
import MealList from "./Meallist.jsx"
import "./CSS/meal.css"
import Footer from '../footer';
function MealPlanner() {
  const [mealData, setMealData] = useState(null)
  const [calories, setCalories] = useState(2000)

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=cb1c464d94f142c08b156c5beddade8b&timeFrame=day&targetCalories=${calories}`
    )
      .then(response => response.json())
      .then(data => {
        setMealData(data)
      })
      .catch(() => {
        console.log("error")
      })
  }

  function handleChange(e) {
    setCalories(e.target.value)
  }

  return (
    <>
    <div className="App">
      <section className="controls">
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
        />
        <button className="buttont"onClick={getMealData}>Get Daily Meal Plan</button>
      </section>
      {mealData && <MealList mealData={mealData} />}
    </div>
     <Footer />
     </>
  )
}

export default MealPlanner;