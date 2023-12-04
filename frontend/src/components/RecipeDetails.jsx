import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Rating from 'react-rating-stars-component';
import Footer from './footer';
import { toast } from 'react-toastify';

const RecipeDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const { recipeName, userName, ingredients, instructions, timeToCook, email } = location.state || {};
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isFeedbackValid, setIsFeedbackValid] = useState(true);

  // Handle rating change
  const handleRatingChange = (newRating) => {
    setFeedbackRating(newRating);
  };

  // Handle feedback change
  const handleFeedbackChange = (e) => {
    const feedbackValue = e.target.value;
    setFeedback(feedbackValue);

    // Validate feedback (e.g., not empty)
    setIsFeedbackValid(feedbackValue.trim() !== '');
  };

  // Handle feedback submission
  const handleFeedbackSubmit = () => {
    if (isFeedbackValid) {
      console.log('Submitting feedback:', feedback);

      toast.success('Feedback submitted successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    } else {
      toast.error('Invalid feedback. Please provide valid feedback.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
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
          <div className="col-md-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Recipe Image"
              className="img-fluid rounded"
            />
            <div className="mt-4">
              <h4>Feedback</h4>
              <Rating
                count={5}
                value={feedbackRating}
                onChange={handleRatingChange}
                size={24}
                activeColor="#ffd700"
              />
              <textarea
                className={`form-control mt-2 ${isFeedbackValid ? '' : 'is-invalid'}`}
                rows="4"
                placeholder="Share your feedback..."
                value={feedback}
                onChange={handleFeedbackChange}
              ></textarea>
              <div className="invalid-feedback">Please provide valid feedback.</div>
              <button
                className="btn btn-primary mt-2"
                onClick={handleFeedbackSubmit}
                disabled={!isFeedbackValid}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecipeDetails;
