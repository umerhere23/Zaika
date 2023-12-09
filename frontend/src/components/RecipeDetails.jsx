import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Rating from 'react-rating-stars-component';
import Footer from './footer';
import { saveFeedback } from '../Service/api';
import { fetchfeedback } from '../Service/api';

const RecipeDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { recipeName, userName, ingredients, instructions, timeToCook, email } = location.state || {};
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    email: '',
    rating: 0,
    feedbackText: '',
    recipeId: id,
  });


  const [feedbackdetails, setFeedbackDetails] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);
  const fetchData = async () => {
    try {
      const result = await fetchfeedback(id); 
      setFeedbackDetails(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const [isFeedbackValid, setIsFeedbackValid] = useState({
    rating: false,
    feedbackText: false,
    email: false,
  });

  const handleRatingChange = (newRating) => {
    setFeedbackData({ ...feedbackData, rating: newRating });
    setIsFeedbackValid({ ...isFeedbackValid, rating: newRating > 0 });
  };

  const handleFeedbackChange = (e) => {
    const feedbackValue = e.target.value;
    setFeedbackData({ ...feedbackData, feedbackText: feedbackValue });
    setIsFeedbackValid({ ...isFeedbackValid, feedbackText: feedbackValue.trim() !== '' });
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setFeedbackData({ ...feedbackData, email: emailValue });
    setIsFeedbackValid({ ...isFeedbackValid, email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue) });
  };

  const handleFeedbackSubmit = async () => {
    const isValid = Object.values(isFeedbackValid).every((value) => value);

    if (isValid) {
      try {
        await saveFeedback(feedbackData);
        setIsSubmitted(true);
        setShowSuccessMessage(true);
      } catch (error) {
        console.error('Error submitting feedback:', error);
        setShowErrorMessage(true);
      }
    } else {
      setShowErrorMessage(true);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <h2>{id}</h2>
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
            <img src="https://via.placeholder.com/150" alt="Recipe Image" className="img-fluid rounded" />
            <div className="mt-4">
              {isSubmitted ? (
                <div className="alert alert-info" role="alert">
                  Feedback has already been submitted.
                </div>
              ) : (
                <>
                  <h4>Feedback {id}</h4>
                  <Rating
                    count={5}
                    value={feedbackData.rating}
                    onChange={handleRatingChange}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <textarea
                    className={`form-control mt-2 ${isFeedbackValid.feedbackText ? '' : 'is-invalid'}`}
                    rows="4"
                    placeholder="Share your feedback..."
                    value={feedbackData.feedbackText}
                    onChange={handleFeedbackChange}
                  ></textarea>
                  <input
                    type="email"
                    className={`form-control mt-2 ${isFeedbackValid.email ? '' : 'is-invalid'}`}
                    placeholder="Your Email"
                    value={feedbackData.email}
                    onChange={handleEmailChange}
                  />
                  <div className="invalid-feedback">
                    {isFeedbackValid.email ? '' : 'Please provide a valid email address.'}
                  </div>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={handleFeedbackSubmit}
                    disabled={!Object.values(isFeedbackValid).every((value) => value)}
                  >
                    Submit Feedback
                  </button>

                  {showSuccessMessage && (
                    <div className="alert alert-success mt-2" role="alert">
                      Feedback submitted successfully!
                    </div>
                  )}

                  {showErrorMessage && (
                    <div className="alert alert-danger mt-2" role="alert">
                      Error submitting feedback. Please try again.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="row mt-4">
  <div className="col-md-12">
    {feedbackdetails.map((feedback, index) => (
  <div key={index} className="media mb-3">
    <div className="media-body">
      <h5 className="mt-0">Feedback {index + 1}</h5>
      <p>Rating: {feedback.rating}</p>
      <p>Feedback: {feedback.feedbackText}</p>
      <p>Email: {feedback.email}</p>
    </div>
  </div>
))}

  </div>
</div>

       
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecipeDetails;
