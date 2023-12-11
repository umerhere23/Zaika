import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Rating from 'react-rating-stars-component';
import Footer from './footer';
import { saveFeedback } from '../Service/api';
import { fetchAllFeedbacks } from '../Service/api';
import { faShareAlt, faCommentAlt, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

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

  const handleShareClick = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
    setShowSuccessMessagefd(true);
  };


  const [feedbackdetails, setFeedbackDetails] = useState([]);
  const [showSuccessMessagefd, setShowSuccessMessagefd] = useState(false);

  const [isFeedbackValid, setIsFeedbackValid] = useState({
    rating: false,
    feedbackText: false,
    email: false,
  });
  const fetchData = async () => {
    try {
      const result = await fetchAllFeedbacks(); // Change this line to fetch all feedbacks
      setFeedbackDetails(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
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
        
      <div className="container mt-4  ">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <div className="row">
          <div className="col-md-8">
            <h2>{recipeName}</h2>
            <p><i class="fa fa-user" aria-hidden="true"></i>: {userName}</p>
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
            <p><FontAwesomeIcon icon={faClock} /> &nbsp;
: {timeToCook}	(Hours)
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

<h3 className="fd">Users FeedBacks</h3>
          <div className="row mt-4">
          <div className="col-md-12 boxdb">
            {feedbackdetails.map((feedback, index) => (
              feedback.recipeId === id ? (
                <div key={index} className="media mb-3">
                  <div className="media-body">
                    <h5 className="mt-0">Feedback {index + 1}</h5>
                    <p><b>Rating:</b> {feedback.rating}</p>
                    <p><b>Feedback:</b> {feedback.feedbackText}</p>
                    <p><i className="fa fa-envelope" aria-hidden="true"></i> : {feedback.email}</p>
                  </div>
                  <hr />

                </div>
                
              ) : null
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