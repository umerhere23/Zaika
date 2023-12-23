import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Rating from "react-rating-stars-component";
import Footer from "./footer";
import { saveFeedback, fetchAllFeedbacks ,fetchrecpie} from "../Service/api";
import { faShareAlt, faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import StarRating from "../components/icons/stars.jsx";
import "../components/CSS/feedback.css";

const RecipeDetails = () => {
  const { id} = useParams();
  const location = useLocation();
  const {
    recipeName,
    userName,
    ingredients,
    instructions,
    timeToCook,
    email,
    Recpimage,
  } = location.state || {};
  console.log(Recpimage)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    email: "",
    rating: 0,
    feedbackText: "",
    recipeId: id,
  });
  const [feedbackdetails, setFeedbackDetails] = useState([]);
  const [showSuccessMessagefd, setShowSuccessMessagefd] = useState(false);

  const [isFeedbackValid, setIsFeedbackValid] = useState({
    rating: false,
    feedbackText: false,
    email: false,
  });
  const [recipeDetails, setRecipeDetails] = useState(null); 
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const recipe = await fetchrecpie(id);
        setRecipeDetails(recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);
console.log()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAllFeedbacks();
        setFeedbackDetails(result);
      } catch (error) {
        console.error("Error:", error);
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
    setIsFeedbackValid({
      ...isFeedbackValid,
      feedbackText: feedbackValue.trim() !== "",
    });
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setFeedbackData({ ...feedbackData, email: emailValue });
    setIsFeedbackValid({
      ...isFeedbackValid,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue),
    });
  };

  const handleFeedbackSubmit = async () => {
    const isValid = Object.values(isFeedbackValid).every((value) => value);

    if (isValid) {
      const userSubmittedFeedback = feedbackdetails.some(
        (feedback) =>
          feedback.email === feedbackData.email && feedback.recipeId === id
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
        console.error("Error submitting feedback:", error);
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

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <div className="row">
          <div className="col-md-8">
            <h2>{recipeName}</h2>
            <p>
              <i class="fa fa-user" aria-hidden="true"></i>: {userName}
            </p>
            <h5>Ingredient: </h5>
            <ol className="instruction-lists">
              {ingredients &&
                ingredients
                  .split(",")
                  .map((ingredient, index) => (
                    <li key={index}>{ingredient.trim()}</li>
                  ))}
            </ol>
            <div>
              <h5>Instructions:</h5>
              <ol className="instruction-list">
                &nbsp;&nbsp;&nbsp;&nbsp;
                {instructions &&
                  instructions
                    .split(",")
                    .map((step, index) => <li key={index}>{step.trim()}</li>)}
              </ol>
            </div>
            <p>
              <FontAwesomeIcon icon={faClock} /> &nbsp; : {timeToCook} (Mins)
            </p>
            <p>
              <i class="fa fa-envelope" aria-hidden="true"></i>: {email}
            </p>
            {id && (
              <p>
                {" "}
                <div className="share">
                  <div className="share">
                    <FontAwesomeIcon
                      icon={faShareAlt}
                      onClick={handleShareClick}
                      title="Share"
                    />{" "}
                    &nbsp;&nbsp;
                    <FontAwesomeIcon
                      icon={faClipboard}
                      onClick={handleShareClick}
                      title="Copy Link"
                    />
                    {showSuccessMessagefd && (
                      <div className="alert alert-success mt-2" role="alert">
                        Address Copied successfully!
                      </div>
                    )}
                  </div>
                </div>
              </p>
            )}{" "}
          </div>

          <div className="col-md-4">
            <img src={Recpimage} alt="Recipe Image" className="img-fluid rounded" />
            <div className="mt-4">
              {isSubmitted ? (
                <div className="alert alert-info" role="alert">
                  Feedback has already been submitted.
                </div>
              ) : (
                <>
                  {showErrorMessage && (
                    <div className="alert alert-danger mt-2" role="alert">
                      You have already submitted feedback. You are not allowed
                      to submit feedback again.
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
                    className={`form-control mt-2 ${
                      isFeedbackValid.feedbackText ? "" : "is-invalid"
                    }`}
                    rows="4"
                    placeholder="Share your feedback..."
                    value={feedbackData.feedbackText}
                    onChange={handleFeedbackChange}
                  ></textarea>
                  <input
                    type="email"
                    className={`form-control mt-2 ${
                      isFeedbackValid.email ? "" : "is-invalid"
                    }`}
                    placeholder="Your Email"
                    value={feedbackData.email}
                    onChange={handleEmailChange}
                  />
                  <div className="invalid-feedback">
                    {isFeedbackValid.email
                      ? ""
                      : "Please provide a valid email address."}
                  </div>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={handleFeedbackSubmit}
                    disabled={
                      !Object.values(isFeedbackValid).every((value) => value)
                    }
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
              {feedbackdetails.map((feedback, index) =>
                feedback.recipeId === id ? (
                  <div key={index} className="col-md-4 mb-0">
                    <div className="d-flex justify-content-center mb-4">
                      <img
                        src="data:image/png;base64,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"
                        className="rounded-circle shadow-1-strong"
                        style={{ width: "20%" }}
                        alt="User Avatar"
                      />
                    </div>
                    <h5 className="mb-3">{feedback.email}</h5>
                    <h6 className="text-primary mb-3">User</h6>
                    <p className="px-xl-3">
                      <i className="fas fa-quote-left pe-2"></i>
                      {feedback.feedbackText}
                    </p>
                    <ul className="list-unstyled d-flex justify-content-center mb-0">
                      {[...Array(feedback.rating).keys()].map((star, index) => (
                        <li key={index}>
                          <i className="fas fa-star fa-sm text-warning"></i>
                        </li>
                      ))}
                      {[...Array(5 - feedback.rating).keys()].map(
                        (star, index) => (
                          <li key={index}>
                            <i className="far fa-star fa-sm text-warning"></i>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ) : null
              )}

              <div class="card ttt">
                <div className="d-flex justify-content-center mb-4"></div>
                <h5 className="mb-3">Average Rating</h5>
                <h6 className="text-primary mb-3">Recipe</h6>
                <ul className="list-unstyled d-flex justify-content-center mb-0">
                  {[...Array(Math.round(average)).keys()].map((star, index) => (
                    <li key={index}>
                      <i className="fas fa-star fa-sm text-warning"></i>
                    </li>
                  ))}
                  {[...Array(5 - Math.round(average)).keys()].map(
                    (star, index) => (
                      <li key={index}>
                        <i className="far fa-star fa-sm text-warning"></i>
                      </li>
                    )
                  )}
                </ul>
                <p className="mt-2">Average Rating: {average.toFixed(1)}</p>

                <ul className="list-unstyled d-flex justify-content-center mb-0">
                  {ratingsCount.map((count, index) => (
                    <li key={index}>
                      <span className="badge bg-secondary mx-1">{`${
                        index + 1
                      } stars: ${count}`}</span>
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
