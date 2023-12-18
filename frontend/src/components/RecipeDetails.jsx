import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Rating from 'react-rating-stars-component';
import Footer from './footer';
import { saveFeedback, fetchAllFeedbacks } from '../Service/api';
import { faShareAlt, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../components/icons/stars.jsx';
import '../components/CSS/feedback.css';

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
  const [showSuccessMessagefd, setShowSuccessMessagefd] = useState(false);

  const [isFeedbackValid, setIsFeedbackValid] = useState({
    rating: false,
    feedbackText: false,
    email: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAllFeedbacks();
        setFeedbackDetails(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);

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
      const userSubmittedFeedback = feedbackdetails.some(
        (feedback) => feedback.email === feedbackData.email && feedback.recipeId === id
      );

      if (userSubmittedFeedback) {
        setShowErrorMessage(true);
        setShowSuccessMessage(false);
        return;
      }

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

  const handleShareClick = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
    setShowSuccessMessagefd(true);
  };

  const averageAndStarCount = () => {
    const userFeedbacks = feedbackdetails.filter(
      (feedback) => feedback.recipeId === id 
    );

    const ratingsCount = [0, 0, 0, 0, 0];
    const totalRating = userFeedbacks.reduce((sum, feedback) => {
      ratingsCount[feedback.rating - 1]++;
      return sum + feedback.rating;
    }, 0);
    const numFeedbacks = userFeedbacks.length;
    const average = numFeedbacks > 0 ? totalRating / numFeedbacks : 0;
    return { average, ratingsCount };
  };

  const { average, ratingsCount } = averageAndStarCount();


  return (
    <>
        
      <div className="container mt-4  ">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <div className="row">
          <div className="col-md-8">
            <h2>{recipeName}</h2>
            <p><i class="fa fa-user" aria-hidden="true"></i>: {userName}</p>
            <h5>Ingredient:</h5>
            <ol className="instruction-lists">
  {ingredients &&
    ingredients.split(',').map((ingredient, index) => (
      <li key={index}>{ingredient.trim()}</li>
    ))}
</ol>
   <div>
              <h5>Instructions:</h5>
              <ol className="instruction-list">&nbsp;&nbsp;&nbsp;&nbsp;
  {instructions &&
    instructions.split(',').map((step, index) => (
      <li key={index}>{step.trim()}</li>
    ))}
</ol>  

            </div>
            <p><FontAwesomeIcon icon={faClock} /> &nbsp;
: {timeToCook}	(Mins)
</p>
            <p><i class="fa fa-envelope" aria-hidden="true"></i>
: {email}</p>
            {id && <p>    <div className="share">
             <div className="share">
  <FontAwesomeIcon icon={faShareAlt} onClick={handleShareClick} title="Share" /> &nbsp;&nbsp;
  <FontAwesomeIcon icon={faClipboard} onClick={handleShareClick} title="Copy Link" />
   {showSuccessMessagefd && (
              <div className="alert alert-success mt-2" role="alert">
                Address Copied successfully!
              </div>
            )}
                  
</div>


          </div></p>}           </div>

          <div className="col-md-4">
          <img src="https://via.placeholder.com/150" alt="Recipe Image" className="img-fluid rounded" />
          <div className="mt-4">
            {isSubmitted ? (
              <div className="alert alert-info" role="alert">
                Feedback has already been submitted.
              </div>
            ) : (
              <>
                {showErrorMessage && (
                  <div className="alert alert-danger mt-2" role="alert">
                    You have already submitted feedback. You are not allowed to submit feedback again.
                  </div>
                )}
<h3>User Feedback Form</h3>
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
              </>
            )}
          </div>
        </div>

        

      

<section>
  <div class="row d-flex justify-content-center">
    <div class="col-md-10 col-xl-8 text-center">
      <h3 class="mb-4">Users FeedBacks</h3>
    
    </div>
  </div>

  <div class="row text-center">
    {feedbackdetails.map((feedback, index) => (
      feedback.recipeId === id ? (
        <div key={index} className="col-md-4 mb-0">
          <div className="d-flex justify-content-center mb-4">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
              className="rounded-circle shadow-1-strong" style={{ width: "20%" }} alt="User Avatar" />
          </div>
          <h5 className="mb-3">{feedback.email}</h5>
          <h6 className="text-primary mb-3">User</h6>
          <p className="px-xl-3">
            <i className="fas fa-quote-left pe-2"></i>{feedback.feedbackText}
          </p>
          <ul className="list-unstyled d-flex justify-content-center mb-0">
            {[...Array(feedback.rating).keys()].map((star, index) => (
              <li key={index}>
                <i className="fas fa-star fa-sm text-warning"></i>
              </li>
            ))}
            {[...Array(5 - feedback.rating).keys()].map((star, index) => (
              <li key={index}>
                <i className="far fa-star fa-sm text-warning"></i>
              </li>
            ))}
          </ul>
        </div>
      ) : null
    ))}

<div class="card ttt">            
<div className="d-flex justify-content-center mb-4">
        
            </div>
            <h5 className="mb-3">Average Rating</h5>
            <h6 className="text-primary mb-3">Recipe</h6>
            <ul className="list-unstyled d-flex justify-content-center mb-0">
              {[...Array(Math.round(average)).keys()].map((star, index) => (
                <li key={index}>
                  <i className="fas fa-star fa-sm text-warning"></i>
                </li>
              ))}
              {[...Array(5 - Math.round(average)).keys()].map((star, index) => (
                <li key={index}>
                  <i className="far fa-star fa-sm text-warning"></i>
                </li>
              ))}
            </ul>
            <p className="mt-2">Average Rating: {average.toFixed(1)}</p>

            <ul className="list-unstyled d-flex justify-content-center mb-0">
              {ratingsCount.map((count, index) => (
                <li key={index}>
                  <span className="badge bg-secondary mx-1">{`${index + 1} stars: ${count}`}</span>
                </li>
              ))}
            </ul>
          </div>
  </div>
</section>

        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default RecipeDetails;