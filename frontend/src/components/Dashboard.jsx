import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CRow, CCol, CWidgetStatsB } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faBan,
  faCheckCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import "./CSS/Dashboard.css";
import { onAddRecipe } from "../Service/api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Footer from "./footer";
import StarRating from "../components/icons/stars.jsx";
import { Table, Modal } from "react-bootstrap";
import "./CSS/Dashboard.css";
import moment from "moment";
import {
  sendMealsToBackend,
  fetchMealsFromBackend,
  deleteMealFromBackend,
} from "../Service/api";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { addIngredientPack } from "../Service/api.js";

import { MDBCard, MDBContainer, MDBCardBody, MDBInput } from "mdb-react-ui-kit";

import {
  fetchUserDetails,
  updateUserDetails,
  fetchUserRecipes,
  removeRecipe,
} from "../Service/api";
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import { fetchAllFeedbacks, removefeedback,AddIngredients } from "../Service/api";
import imgsucess from "../components/img/tikpic.png";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";

import {
  CDBInput,
  CDBCard,
  CDBCardBody,
  CDBIcon,
  CDBBtn,
  CDBLink,
  CDBContainer,
} from "cdbreact";
const localizer = momentLocalizer(moment);

const Dasboard = () => {
  const location = useLocation();
  const [filteredIngredients, setFilteredIngredients] = useState([]);


  const [ingdetails, setingDetails] = useState([]);
  const [meals, setMeals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fetchedMeals, setFetchedMeals] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealType, setMealType] = useState("Breakfast");
  const [mealDescription, setMealDescription] = useState("");
  const [EditMode, setEditModes] = useState(false);
  const [mealToEdit, setMealToEdit] = useState(null);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userRecipes, setUserRecipes] = useState([]);
  const userEmail = location.state?.userEmail;
  const Uname = location.state?.username;

  const userName = userData?.Username || "";

  const [feedbackdetails, setFeedbackDetails] = useState([]);
  const [selectedTable, setSelectedTable] = useState("users");

  const [formData, setFormData] = useState({
    recipeId: "",
    recipeName: "", // New field
    totalProducts: "", // New field
    details: "", // New field
    packName: "", // New field
    discount: "", // New field
    ingredients: [
      { name: "", quantity: "", price: "" },
      { name: "", quantity: "", price: "" },
    ],
    seller: Uname,
    image: "",
  });

  const [recipedata, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    image: null,
    timeToCook: "",
    UserName: Uname,
    email: userEmail || "",
  });
  console.log(Uname);
  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setShowModal(true);
    setEditModes(false);
    setMealToEdit(null);
  };

  const saveMeal = () => {
    const newMeal = {
      title: `${mealType} - ${mealDescription}`,
      start: selectedDate,
      end: selectedDate,
      Username: Uname,
    };

    setMeals((prevMeals) => {
      if (EditMode && mealToEdit) {
        return prevMeals.map((meal) => (meal === mealToEdit ? newMeal : meal));
      } else {
        return [...prevMeals, newMeal];
      }
    });

    setShowModal(false);
  };
  const fetchAndSetMeals = async () => {
    try {
      const fetchedMeals = await fetchMealsFromBackend(userName);
      setMeals(fetchedMeals);
      setFetchedMeals(fetchedMeals);
    } catch (error) {
      console.error("Error fetching meals:", error);
      // toast.error('Failed to fetch meals. Please try again later.');
    }
  };

  useEffect(() => {
    fetchAndSetMeals();
  }, [userName]);
  useEffect(() => {
    console.log("Meals updated:", meals);
  }, [meals]);

  const handleSaveMealPlan = async (e) => {
    e.preventDefault();

    console.log("Meals to be sent:", meals);

    try {
      await sendMealsToBackend(meals);
      toast.success("Meal plan saved successfully!", { autoClose: 500 });

      console.log("Meal plan saved successfully");
    } catch (error) {
      toast.error(" Error saving meals!", { autoClose: 500 });
    }
  };

  const handleDeleteMeal = async (mealToDeleteId) => {
    try {
      console.log("Deleting Meal ID:", mealToDeleteId);

      await deleteMealFromBackend(mealToDeleteId);

      const updatedMeals = meals.filter((meal) => meal._id !== mealToDeleteId);
      setMeals(updatedMeals);

      toast.success("Meal deleted successfully", { autoClose: 500 });
    } catch (error) {
      console.error("Error deleting meal:", error);
      toast.error("Failed to delete meal. Please try again later.", {
        autoClose: 500,
      });
    }
  };

  const handleEditMeal = (mealToEdit) => {
    setMealType("");
    setMealDescription(mealToEdit.title);
    setEditModes(true);
    setMealToEdit(mealToEdit);
    setSelectedDate(mealToEdit.start);
    setShowModal(true);
  };

  const customCellClass = "custom-calendar-cell";

  const [errors, setErrors] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    name,
    ingredients,
    instructions,
    image,
    timeToCook,
    UserName,
    email,
  } = recipedata;
  const handleChange = (e) => {
    setRecipe({ ...recipedata, [e.target.name]: e.target.value });
  };

  const fetchData1 = async () => {
    try {
      const result = await fetchAllFeedbacks();
      setFeedbackDetails(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData1();
  }, []);
  useEffect(() => {
    if (userName) {
      fetchUserData(userName);
      fetchUserRecipesData(userName);
    }
  }, [userName]);
  useEffect(() => {
    if (!isLoggedIn()) {
      return <Navigate to="/login" />;
    }
  }, []);

  const addDetails = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const basePath = "../img";
      const fileName = `${recipedata.name.replace(/\s+/g, "_")}.jpg`;
      const imagePath = `${basePath}/${fileName}`;

      const imageBlob = recipedata.image;
      const reader = new FileReader();

      reader.readAsDataURL(imageBlob);

      reader.onloadend = () => {
        const base64String = reader.result;
        localStorage.setItem(imagePath, base64String);
      };
      console.log(`Image "${fileName}" saved to Local Storage`);

      try {
        await onAddRecipe(recipedata);

        toast.success("Recipe submitted successfully!", { autoClose: 500 });

        setRecipe({
          name: "",
          ingredients: "",
          instructions: "",
          image: null,
          timeToCook: "",
          UserName: Uname,
          email: userEmail || "",
        });
        setErrors({});
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error submitting recipe:", error);
        toast.error("Error submitting recipe. Please try again.");
      }
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64String = event.target.result;
        setRecipe({
          ...recipedata,
          image: imageFile,
          imageString: base64String,
        });
      };

      reader.readAsDataURL(imageFile);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const filtered = ingdetails.filter((ingredient) => ingredient.seller ===Uname);
    setFilteredIngredients(filtered);
  }, [ingdetails]);
  const fetchData = async () => {
    try {
      const result = await AddIngredients();
      setingDetails(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const validateForm = () => {
    let errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (name.length < 6) {
      errors.name = "Invalid name format";
    }

    if (!ingredients.trim()) {
      errors.ingredients = "ingredients is required";
    } else if (ingredients.length < 6) {
      errors.ingredients = "ingredients must be at least 6 characters long";
    }

    if (!instructions.trim()) {
      errors.instructions = "instructions is required";
    }

    if (!timeToCook.trim()) {
      errors.timeToCook = "timeToCook is required";
    }

    if (!UserName.trim()) {
      errors.UserName = "userName is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };
  const fetchUserRecipesData = async (userName) => {
    try {
      const recipes = await fetchUserRecipes(userName);
      setUserRecipes(recipes);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
      toast.error("Failed to fetch user recipes");
    }
  };

  const handleRemoveFeedback = async (_id) => {
    try {
      await removefeedback(_id);

      const updatedfeedback = feedbackdetails.filter(
        (feedbackData) => feedbackData._id !== _id
      );
      setFeedbackDetails(updatedfeedback);

      toast.success("Feedback removed successfully", { autoClose: 500 });
    } catch (error) {
      console.error("Error removing feedback:", error);
      toast.error("Error removing feedback", { autoClose: 500 });
    }
  };
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isLoggedIn()) {
        event.returnValue = true;
        return true;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const isLoggedIn = () => {
    const token = localStorage.getItem("userToken");
    return !!token;
  };
  const handleRemoveRecipe = async (recipeId) => {
    try {
      await removeRecipe(recipeId);

      const updatedRecipes = userRecipes.filter(
        (recipe) => recipe._id !== recipeId
      );
      setUserRecipes(updatedRecipes);

      toast.success("Recipe removed successfully", { autoClose: 500 });
    } catch (error) {
      console.error("Error removing recipe:", error, { autoClose: 500 });
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchUserData(userEmail);
    }
  }, [userEmail]);

  const fetchUserData = async (email) => {
    try {
      const result = await fetchUserDetails(email);
      setUserData(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserDetails(userData._id, userData);
      toast.success("Profile updated successfully", { autoClose: 500 });
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Failed to update user data");
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newIngredients = [...formData.ingredients];
    newIngredients[index][name] = value;

    setFormData({
      ...formData,
      ingredients: newIngredients,
    });
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        { name: "", quantity: "", price: "" },
      ],
    });
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);

    setFormData({
      ...formData,
      ingredients: newIngredients,
    });
  };

  const handleSubmit = async () => {
    if (
      formData.recipeId === "" ||
      formData.recipeName === "" ||
      formData.totalProducts === "" ||
      formData.details === "" ||
      formData.packName === "" ||
      formData.discount === "" ||
      formData.ingredients.some((ingredient) => ingredient.name === "" || ingredient.quantity === "" || ingredient.price === "") ||
      formData.seller === "" ||
      formData.image === ""
    ) {
      toast.error("Please fill in all required fields.");
      return; 
    }
  
    try {
      const result = await addIngredientPack(formData);
      console.log(result);
      toast.success("Ingredient Added successfully", { autoClose: 500 });
      setIsSubmitted(true);
      setFormData({
        recipeId: "",
        recipeName: "",
        totalProducts: "",
        details: "",
        packName: "",
        discount: "",
        ingredients: [
          { name: "", quantity: "", price: "" },
          { name: "", quantity: "", price: "" },
        ],
        seller: "Uname",
        image: "",
      });
    } catch (error) {
      console.error("Error Ingredient :", error, { autoClose: 500 });
      console.error("Error:", error.message);
    }
  };

  const UserRecpieUpload = () => {
    return (
      <>
        {isSubmitted ? (
          <div className="text-center Sucessmsg" >
            <img src={imgsucess} alt="" style={{ width: "5%" }} />
            <h2>Thank you for your submission!</h2>
            <p>Your recipe has been added.</p>
            <button className="btn btn-primary btt">
              {" "}
              <a href="/dashboard">Save Changes</a>
            </button>
          </div>
        ) : (
          <CDBContainer className="Formrecp" style={{marginTop:"-70%"}}>
            <CDBCard style={{ width: "30rem" }}>
              <CDBCardBody className="mx-4">
                <div className="text-center mt-4 mb-2">
                  <h2>Add Recipe</h2>
                </div>
                <div className="form-flex-row mb-n4">
                  <div className="col">
                    <CDBInput
                      material
                      placeholder={errors.name ? errors.name : "Name of recipe"}
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => handleChange(e)}
                      required
                      style={{ borderColor: errors.name ? "red" : "" }}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                </div>

                <CDBInput
                  material
                  placeholder={
                    errors.ingredients
                      ? errors.ingredients
                      : "Step to make ingredients"
                  }
                  type="text"
                  name="ingredients"
                  value={ingredients}
                  onChange={(e) => handleChange(e)}
                  required
                  style={{ borderColor: errors.name ? "red" : "" }}
                />
                {errors.ingredients && (
                  <div className="invalid-feedback">{errors.ingredients}</div>
                )}

                <CDBInput
                  material
                  placeholder={
                    errors.instructions ? errors.instructions : "Instructions"
                  }
                  type="text"
                  name="instructions"
                  value={instructions}
                  onChange={(e) => handleChange(e)}
                  style={{ borderColor: errors.name ? "red" : "" }}
                  required
                />
                {errors.instructions && (
                  <div className="invalid-feedback">{errors.instructions}</div>
                )}

                <CDBInput
                  material
                  placeholder={
                    errors.timeToCook
                      ? errors.timeToCook
                      : "Time to cook (mins)"
                  }
                  type="number"
                  name="timeToCook"
                  value={timeToCook}
                  onChange={(e) => handleChange(e)}
                  required
                  style={{ borderColor: errors.name ? "red" : "" }}
                />
                {errors.timeToCook && (
                  <div className="invalid-feedback">{errors.timeToCook}</div>
                )}

                <CDBInput
                  material
                  placeholder="Picture"
                  type="file"
                  name="image"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <div className="invalid-feedback">{errors.image}</div>
                )}
                {image && (
                  <div>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Recipe"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                )}

                <CDBInput
                  material
                  hint="User name"
                  type="text"
                  name="UserName"
                  value={recipedata.UserName}
                  onChange={(e) => handleChange(e)}
                  required
                  disabled
                />
                {errors.UserName && (
                  <div className="invalid-feedback">{errors.UserName}</div>
                )}

                <CDBInput
                  material
                  hint="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => handleChange(e)}
                  required
                  disabled
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}

                <br />
                <div className="form-group">
                  <button
                    className="btn btn-primary1"
                    onClick={(e) => addDetails(e)}
                  >
                    Apply
                  </button>
                </div>
              </CDBCardBody>
            </CDBCard>
          </CDBContainer>
        )}
      </>
    );
  };

  const SellIngredients = () => {
    return (
      <>
        <div className="container mt-5  " style={{ marginLeft: "10%" }} >
          <div
            className="row justify-content-center "
            style={{ marginTop: "-88%" }}
          >
            <div className="col-md-6">
              <div className="" style={{ width: "100%" }}>
                <div className="card-header text-center ">
                  <h5>
                    <b>Add Ingredient Pack</b>
                  </h5>
                  <hr />
                </div>
                <div className="card-body">
                  <form>
                    <div className="mb-3 ">
                      <label htmlFor="recipeId" className="form-label">
                        Recipe ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipeId"
                        value={formData.recipeId}
                        onChange={(e) =>
                          setFormData({ ...formData, recipeId: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="recipeName" className="form-label">
                        Recipe Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipeName"
                        value={formData.recipeName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            recipeName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="packName" className="form-label">
                        Pack Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="packName"
                        value={formData.packName}
                        onChange={(e) =>
                          setFormData({ ...formData, packName: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="discount" className="form-label">
                        Discount
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="discount"
                        value={formData.discount}
                        onChange={(e) =>
                          setFormData({ ...formData, discount: e.target.value })
                        }
                        required
                      />
                    </div>
                    {formData.ingredients.map((ingredient, index) => (
                      <div className="row mb-3" key={index}>
                        <div className="col">
                          <label
                            htmlFor={`ingredientName${index}`}
                            className="form-label"
                          >
                            {index + 1} Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id={`ingredient${index + 1}Name`}
                            name="name"
                            value={ingredient.name}
                            onChange={(e) => handleInputChange(e, index)}
                            required
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor={`ingredientQuantity${index}`}
                            className="form-label"
                          >
                            {index + 1} Quantity(G)
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id={`ingredient${index + 1}Quantity`}
                            name="quantity"
                            value={ingredient.quantity}
                            onChange={(e) => handleInputChange(e, index)}
                            required
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor={`ingredientPrice${index}`}
                            className="form-label"
                          >
                            {index + 1} Price(PKR)
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id={`ingredient${index + 1}Price`}
                            name="price"
                            value={ingredient.price}
                            onChange={(e) => handleInputChange(e, index)}
                            required
                          />
                        </div>
                        {index > 0 && (
                          <div className="col">
                            <button
                              type="button"
                              className="btn btn-danger mt-4 p-3"
                              onClick={() => handleRemoveIngredient(index)}
                            >
                              Remove  {index + 1}
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleAddIngredient}
                    >
                      Add Another Ingredient
                    </button>
                    <div className="mb-3">
                      <label htmlFor="totalProducts" className="form-label">
                        Total Products
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="totalProducts"
                        value={formData.totalProducts}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            totalProducts: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="details" className="form-label">
                        Extra Details
                      </label>
                      <textarea
                        className="form-control"
                        id="details"
                        style={{ height: "100px" }}
                        value={formData.details}
                        onChange={(e) =>
                          setFormData({ ...formData, details: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="seller" className="form-label">
                        Seller
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="seller"
                        value={formData.seller}
                        onChange={(e) =>
                          setFormData({ ...formData, seller: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">
                        Image URL:
                      </label>
                      <a
                        href="https://www.atatus.com/tools/image-to-url"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Image Url Generator
                      </a>{" "}
                      <span className="text-danger">
                        (Please Use this For Url Generation)
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        required
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderUsersTable = () => {
    return (
      <>
        {userData ? (
          <div className="new users1">
            {editMode ? (
              <form
                onSubmit={handleFormSubmit}
                className="max-w-md mx-auto tte"
              >
                <table className="table  ">
                  <tbody>
                    <tr className="square border border-warning">
                      <th colSpan={"2"} style={{ textAlign: "center" }}>
                        Edit User Profile
                      </th>
                    </tr>
                    <tr>
                      <th className="text-lg font-bold text-gray-700">Id:</th>
                      <td className="text-gray-800">{userData._id}</td>
                    </tr>
                    <tr>
                      <th className="text-lg font-bold text-gray-700">
                        Username:
                      </th>
                      <td className="text-gray-800">{userData.Username}</td>
                    </tr>
                    <tr>
                      <th className="text-lg font-bold text-gray-700">
                        Email:
                      </th>
                      <td className="text-gray-800">{userData.email}</td>
                    </tr>
                    <tr>
                      <th className="text-lg font-bold text-gray-700">
                        Address:
                      </th>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={userData.address}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              address: e.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="text-lg font-bold text-gray-700">City:</th>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={userData.city}
                          onChange={(e) =>
                            setUserData({ ...userData, city: e.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="text-lg font-bold text-gray-700">
                        State:
                      </th>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={userData.state}
                          onChange={(e) =>
                            setUserData({ ...userData, state: e.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="text-lg font-bold text-gray-700">Zip:</th>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={userData.zip}
                          onChange={(e) =>
                            setUserData({ ...userData, zip: e.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="text-lg font-bold text-gray-700">
                        Account Created On:
                      </th>
                      <td className="text-gray-800">
                        {new Date(userData.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-primary mr-2">
                    Save Changes
                  </button>{" "}
                  &nbsp;
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="btn btn-danger"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="container prof">
                  <div className="row justify-content-center">
                    <div className="col-md-8">
                      <table className="table">
                        <tbody>
                          <tr className="square border border-warning">
                            <th colSpan={"2"} style={{ textAlign: "center" }}>
                              {" "}
                              User Profile Data
                            </th>
                          </tr>
                          <tr>
                            <th className="text-lg font-bold text-gray-700">
                              Id:
                            </th>
                            <td className="text-gray-800">{userData._id}</td>
                          </tr>
                          <tr>
                            <th className="text-lg font-bold text-gray-700">
                              Name:
                            </th>
                            <td className="text-gray-800">
                              {userData.Username}
                            </td>
                          </tr>
                          <tr>
                            <th className="text-lg font-bold text-gray-700">
                              Email:
                            </th>
                            <td className="text-gray-800">{userData.email}</td>
                          </tr>
                          <tr>
                            <th className="text-lg font-bold text-gray-700">
                              Address:
                            </th>
                            <td className="text-gray-800">
                              {userData.address}
                            </td>
                          </tr>
                          <tr>
                            <th className="text-lg font-bold text-gray-700">
                              City:
                            </th>
                            <td className="text-gray-800">{userData.city}</td>
                          </tr>
                          <tr>
                            <th className="text-lg font-bold text-gray-700">
                              State:
                            </th>
                            <td className="text-gray-800">{userData.state}</td>
                          </tr>
                          <tr>
                            <th className="text-lg font-bold text-gray-700">
                              Zip:
                            </th>
                            <td className="text-gray-800">{userData.zip}</td>
                          </tr>
                          <tr>
                            <th className="text-lg font-bold text-gray-700">
                              Account Created On:
                            </th>
                            <td className="text-gray-800">
                              {new Date(userData.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-4 btnedit">
                  <button
                    onClick={handleEditClick}
                    className="bg-blue-500 hover:bg-blue-700 text-blue font-bold py-2 px-4 rounded"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </>
    );
  };

  const renderRecipesTable = () => {
    return (
      <>
        <div className="row justify-content-center " id="recp" >
          <div className="container py-5">
            {userRecipes.length > 0 ? (
              <Table striped bordered hover >
                <thead>
                  <tr>
                    <th
                      colSpan={4}
                      style={{ textAlign: "center" }}
                      className="txt2"
                    >
                      {" "}
                      <h4>User Recipes</h4>{" "}
                    </th>
                  </tr>
                  <tr>
                    <th>Id</th>

                    <th>Name</th>
                    <th>Ingredients</th>
                    <th>Instructions</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userRecipes.map((recipe) => (
                    <tr key={recipe._id}>
                      <td>{recipe._id}</td>
                      <td>{recipe.name}</td>
                      <td>{recipe.ingredients}</td>
                      <td>{recipe.instructions}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          type="button"
                          className="btn "
                          onClick={() => handleRemoveRecipe(recipe._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-center">No recipes found for the user.</p>
            )}
          </div>
        </div>
      </>
    );
  };

  const renderFeedbackTable = () => {
    return (
      <>
        <div className="feedbackUsers">
          <div className="row justify-content-center" id="fb">
            <div className="container py-5">
              <Table striped bordered hover responsive className="table">
                <thead className="thead-dark">
                  <tr>
                    <th
                      colSpan={5}
                      style={{ textAlign: "center" }}
                      className="txt2"
                    >
                      <h4>User Feedbacks</h4>
                    </th>
                  </tr>
                  <tr>
                    <th>#</th>
                    <th>Rating</th>
                    <th>Feedback</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbackdetails.map((feedback, index) =>
                    feedback.email === userData.email ? (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <StarRating rating={feedback.rating} />
                        </td>
                        <td>{feedback.feedbackText}</td>
                        <td>{feedback.email} </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            type="button"
                            className="btn "
                            onClick={() => handleRemoveFeedback(feedback._id)}
                          />
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </>
    );
  };
  const UserMeal = () => {
    return (
      <>
        <div className="sett">
          <div className="container mt-4">
            <style>
              {`.${customCellClass} {
         
        }`}
            </style>

            <Calendar
              localizer={localizer}
              events={meals}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              selectable
              onSelectSlot={handleSelectSlot}
              eventPropGetter={(event, start, end, isSelected) => {
                const style = {
                  backgroundColor: "#3174ad",
                };
                return {
                  style,
                };
              }}
              components={{
                event: ({ event }) => (
                  <div>
                    <div>{event.title}</div>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteMeal(event._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="info"
                      onClick={() => handleEditMeal(event)}
                    >
                      Edit
                    </Button>
                  </div>
                ),
                timeSlotWrapper: ({ children }) => (
                  <div className={customCellClass}>{children}</div>
                ),
              }}
            />

            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>{EditMode ? "Edit Meal" : "Add Meal"}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formMealType">
                    <Form.Label>Meal Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={mealType}
                      onChange={(e) => setMealType(e.target.value)}
                    >
                      <option>Breakfast</option>
                      <option>Lunch</option>
                      <option>Dinner</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formMealDescription">
                    <Form.Label>Meal Description</Form.Label>
                    <Form.Control
                      type="text"
                      value={mealDescription}
                      onChange={(e) => setMealDescription(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={saveMeal}>
                  {EditMode ? "Save Changes" : "Save Meal"}
                </Button>
              </Modal.Footer>
            </Modal>
            <Button
              variant="success"
              onClick={handleSaveMealPlan}
              className="mt-3"
            >
              Save Meal Plan
            </Button>

            {fetchedMeals.length > 0 && (
              <h1 className="ddd">
                Fetched Meal IDs:{" "}
                {fetchedMeals.map((meal) => meal._id).join(", ")}
              </h1>
            )}
          </div>
        </div>
        <ToastContainer />
      </>
    );
  };

  const ShowIngredients = () => {
    return( 
    <>
       <div className="container " id="ingred">
      <div className="row  ingred">
        {filteredIngredients.map((ingredient, index) => (
          <div key={index} className="col-md-4 mb-3 " >
            <MDBCard >
              <div className="card-body " >
                <img src={ingredient.image} alt="" srcSet="" />
                <hr />

                <h5 className="card-title">Pack Name : {ingredient.packName}</h5>
                <h6  className="card-title"color='black'><b>Recpie Name:</b> {ingredient.recipeName}</h6>
                <hr />
                <p className="card-text">
                  <b>Quantity:</b> {ingredient.totalProducts},&nbsp;&nbsp;&nbsp;&nbsp; <b>Price:</b> {ingredient.totalPrice}
                 
                  <br /> <b>Seller:</b> {ingredient.seller}&nbsp;&nbsp;&nbsp;&nbsp; <b>Discount</b> {ingredient.discount}%
                </p>
                <b>Details :</b> {ingredient.details}

                {ingredient.ingredients.map((nestedIngredient, nestedIndex) => (
          <div key={nestedIndex}>
            <p>
              <b>Ingredient :</b> {nestedIngredient.name}

            </p>
          </div>
        ))}
 <div className="d-flex justify-content-between">
                  {/* <button onClick={() => onViewDetails(ingredient._id)} color="primary"  type="button" class="btn btn-primary">Details</button> */}
                </div>
              </div>
            </MDBCard>
            
          </div>
        
        ))}
       
      </div>
    </div>
    </> );
  };
  return (
    <>
      <CDBSidebar
        className="CDBSidebar"
        style={{
          background: "  #001827",
          height: "160%",
          maxHeight: "1190vh",
          overflowY: "auto",
        }}
      >
        <div className="d-flex justify-content-center mb-4">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEVVYIDn7O3///9KVnlTXn/q7+9NWXva4ONRXH7t8vJMWHvp7u9FUna+xM1JVXlibIng4udZZIP09feTmazc3uRrdJBeaIa2usbGydNye5SAh57t7vH4+frV2N+6vsqnrryJkaWhprZ8hJunrLuQlqrEytKZoLHL0dZueJKEjaHT2d6zE6BNAAAMeElEQVR4nO2de5eCOA+HK5RargJeUMdRRx1v3/8DLqCOKNcmQdg9+zvv2T3v/qE+0zRJ2zRlWttahf7JjX4Oy8V0NAsYY8FsNF0sDz+Re/LDVevfz1r87NCf/2zPzHF0yxKSc844SxT/k3MpLEt3nOC83c/9sMVf0Rah744XgafHYKxaMaruBYux67f0S9og9KMls3RRx/bCKXQrWEZtUFIThvMxcyypAPeUtBw2nlNbLCnh13rJdQGie0jocrn+ovxRhITzHddhg/c2lDrfuXQ+lopwcvBI8B6Q+uGb6JeREIbR1Kl1mmri0plGJFOSgNA/Mp0W7w6psyOBc0UTTpYC51uqJMRy0jHh94LaPF8VG+sCOSFRhN87h867lEI6OxQjgtC/ACO7qqS+RMxHMGE49j7DlzJ6B7BfhRJGVnv+pUjC2nyU8Huqf5QvkT6FTUcI4erQSvyrE9cPkFwOQHj6sIE+JeTpA4Th2OmIL5Gj7nFUCb9HXQ3gTSKYt0v408kMzIp7Py0Sfi0+70Lz0s9KK2QVwhP/XIyvkuQqlqpAuO/cQh/i+r4NwktvABPECznh17RbH/ouMWo6GRsSTmb9mIJPyaDh2rgZ4Ulpe/cz4rKZv2lEOO8yjSmXs6YijJz+jWAqJ6Ih3Hs9BYyDf4NFYz0hLWByxkb4aV59YKwl3BPMweSwUNclC4LZaDSaBUGyqW3Vn7w1kFObpdYRbjzkT5DCY+fLceOertfh0B8MBv5weL2e3M3xcmYeGrN2FGsII0wiw7lwgm10HQ5M0zBsO/7fXcn/MUxzMLxG25kjMJbL9Rp3U024RnhRLuR5M4nZbHtQphjUNK+bs0TEW+64cEJEHOTW6GcYj1wp3FPxaF5/RhaYkTuVW1RVhBNwKsq9szswm+DdIc3B+gz32bIqgasg/AqgXykCN55qjflSezUMd2YBv48HFWl4BeEImGxLubebD19mII29hH7lFEJ4AdqoOF9NAF8i83oGDqNVvl4sJdwDt2T0wwAygPdhHGyhX1uav5URzmHzPk6jTLUJ+CrbBO6VcK9sLVVC+AVLNbi1gVroQ+YGFje4LPE2JYRT2JTHA6aIoO8u8zbFhEfYbLCOeMAYcQxD1IuT8ELCOSzdlju4j8nINhYwC/IKc5siwhAY6uWQhHBgDGGEfFR0bFNEeIBFQj2isNFEZgSbJWLcjPAEy7f5AhMmXmWfYVbkFJwv5glXwMzJ+iUk/IXmNvlT4jwh0Eb5gmYS3mQsYINYYKc5wm9g2iRcUsI1MCvWc/40RziFLpnobDSRDfwVPBf33wmBXowJkmD/lDmGDuL7ts0bYQhd1uu/lEYam+kv9LhZhJWEQDcTR/sBsZUOoJtT787mldCH7o7KJe0Qxog7qEPw/ArCJfSUUPzQTsN4Ih7B5nQpJ4RGijjSrmmNNJ6IEXRfilnfpYQ78EGvfqImtE/gP7dclhF+wzeAxZCccAgvHHAmJYTAZVmqFgjhP0buigkniHO0mU9POIP/HMcvJAQ70jhX6hlhdiY+CX342Ug8hi1YaQD/OVz4BYTg+JOqBULM0ak45glDDB/nLRDiTofDHCF0UdFTwucS448QvC7sJ+FznfggRET7XhI+o/6DcIuqzOshoTy8Eq5wxaM9JOT66oXQxRVw95CQ6fMXQviqoreEj7zmRviFLEzqIyFjXxnCNfKWQS8JdTdDiEi6+0t4381ICUNsEXcvCRkP/wjn2Ksw/SS8FS+khND95Z4T3nZOU0LkJ/WVkAUPQh9dBtxTwnQzIyGE70z2nNBa3wmxsaK3hGlawyimYV8JGbsR+mgj7S1hsiHF0OuKPhMmiRsjiIZJB7Y29rwJxvCYEgLLHrKSJ+rjw8HAOBH85RcJYYjYeb2LrhoqK2hlVFZBGBOCz33/xBdtAMaIeOvS/ZgQnXYzrwUbTWT8ov/4+jwm3KPT7im1l/nTCJ1872NC3D5iLDlux0iTohr0bzvEhMAywKdE1I6RxmYKLIh+KnambIV2pZbblpXaa3S6FaxYiF466aQ1e1kZ+HTLCRl+cdhvQp/Bizr+FYT6ibloU+81oeUy/AK/34QR+0Hnt70mFD/sgN7C6DWhHLMlPrvtMyG/MIL8vdeEO4aqUPgXEJ7ZCPsZ/SaM+Wb/7TFkM0awh9FrQjxf/wn/H8N6tbg+xCfNJGNobfq7xk8I8b60z/s0SbTAx0M+Ir4R9JCN32tjbEqQ05Df6noIfrvrqTinITi14OeW9rwJ/vpxXopfWyRtN1o5t9gQ9IOVF4L1YdIO45ce0fylaNYYrw/xa/xE3CVGtM01Ses6sSfYp0nlkQZF2xwAm2O8S0QEe22p+JRwEO3hkRM1hLVcgv3SVNwivBdkjtHHag/p3wR73jdR3se36bpHOj7BucVN8kBmphSR/iFnxVZEH0WYu5kXuqbFwYrg/PAui+qirO3TGWlyfog/A76LrKuCEdE11k7PgNHn+HfxGZGZQpvTFMlKzvGBTaHyItrNoPQzt1oMfD3NXXJHYqYGoZ+51dMQ1ETd5VAUtxlXyhcmZiFRXdtNJL7GpPJ8iW51bRS1iQ/hMzdjSJawsb/aRIJNybsImgqSDmF6fy2pESYbQ3zAsK+kbzDca4QJ6rwfQg8iqSO9XbigqdV/fiRuEA1on7Zi/dXq42ur/oTsxGMSpjMsc9+CaonIkoUwJiaaEaUjzdyZ0chifjyIW/gg2sCel2XiAd3dtYwEvH2iuaV9refWHON2/5DQOPgU6mwMl/g5osz9w5ByfltAZ2MPwT3gS5S5Q6pRRiFuXUGDaC6JhzB7D1hzKX0YrLLdRL8V8q6Xu9zY+/ivggRFihsy78rex6dMaxI7VT7ZN4b4s+g3vfZUILhWkhVnqv7U3pEP4VtfDI00HwSs9smHkFnaKyFl0IcQEpzYv+qvyeeDENOOLq8eEOZ6DOH6ROU+vnPCfJ8odHuTF3VP6K1zhNBm+oXqnjDI92vTaA70b+qcUDxfgngSfv2HCLlV1DeRMv3umjDbSjhDSLiZ0TVhSf9SwuS0Y8KyHrSEUb9jwtI+wnQzsVvC8l7Q2gTThjarTgm5NSkl1Kg2u9R3TQmTRrnVygm/aF4XVz+hsckOMRnXq/rqI5sJPyR3qkNIUdF9l3XUqghp6oeEcqGiTZf48+r3LbQ1xY6XvCoTYnpbv8ireaME13r+LsjZBfjVlTfJ8ztQjnCCrz2WE/XCGgPVvvtPb5GikBDvbBzQQTDNjrA45ngKXiVD9mfSx7DSKIpdfc4LcPL/Cdf4Wj8qvpP7kG3v0FuaRW8fF72dd4R/k2DwllG2fUQmHE3fztNW0CRR6tsh4hzfNt0p6qXzxu8fahPQ93BvcVJ4qbqQcbAewRnzb66VEmoAv8atqYt6KPcmw4ymwHil7wtZSt6SVT4osUZRxSvxSox2BLJVuShGKSFU2z3lgm8QLznnGCG2ypnae8Dad/NB5NI6+gQG+pRt2OuR2mqcF0/CCsLmKbgUlwkpX6rEVlUY1d/l1rRDo/UM93ZYB1rGOFg3n49iW8pRTqgt6g2V66Nfu62b3ArzsezF6hrCcFS3kBKziN4+M7INs9F85LOiUF9PqPmVOTgXwZ7QgZaoSezg0q+gqCKs3CKW3nHY6gD+MdbZKi/KtxsSlj/vLPXLZ/hSRns9K7dV7swrGaoJS6pQuGjLgZYxmqWxg+vraoQawsKwqJ8pMlBFxrLYkdt5UiXUondDtVjUXoCoZiyYj05ppG9MqL1WJgu274RvUJjLca8WsAFhtkpDSOIMVFFx7DhnGHmtiTYj1ObOY1Jvr13ypYzJfHwAOjVOpjFhHDSSv5sYnbrmuzFGt8v6dWFChVCbMMnE0ehoAr7JNgfb2FS5rAz0ioTa10hSd75AyDbXgTWrStXUCbWwpa7kQJnXZUWyDSLUtP4MYSKz8e9uTqiFXVNl1HQA1Qi1Vddcf1op/GoVQk3rx1y0lX6zGmEvLFXBQgGE2qrrmG+rWCiEsGuf2tyHwgk7dTiqAwgj7G4Y1QcQStjNbFSegRjCLpyqogtFE36aEWSgSMJPTkcTZqBoQm31GUYDwYckjBnbz+OADoaKsPVxxNgnEaHW5nzE89EQxn61jfhoQ+PDq2gIWzBWiuFLRUWokULivOerCAk1Ikiy0buJllDDQtrEeFoLhImAlGZIjqe1RBhrtTIVqsDseOzaoEvUFmGq1Sqs44zZwtbgUrVKeNcqJg1N07DtFDf5l2GaCVmraHf9A3HEDN2tpOABAAAAAElFTkSuQmCC"
            className="rounded-circle shadow-1-strong"
            style={{ width: "20%" }}
            alt="User Avatar"
          />
        </div>
        <h6 style={{ textAlign: "center" }}>
          {" "}
          <b>
            {Uname}
            <br />
            {email}
          </b>{" "}
        </h6>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          User Dasbaord
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem
              onClick={() => setSelectedTable("users")}
              icon="user"
            >
              Users
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem
              onClick={() => setSelectedTable("recipes")}
              icon="sticky-note"
            >
              Recipes
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem
              onClick={() => setSelectedTable("feedback")}
              icon="star"
              iconType="solid"
            >
              Feedback
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem
              onClick={() => setSelectedTable("upload")}
              icon="plus"
              iconType="solid"
            >
              Upload Recpie
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem
              onClick={() => setSelectedTable("Meal")}
              icon="calendar"
              iconType="solid"
            >
              Meal Planner{" "}
            </CDBSidebarMenuItem>

            <CDBSidebarMenuItem
              onClick={() => setSelectedTable("Sell")}
              icon="plus"
              iconType="solid"
            >
              Sell Ingredients
            </CDBSidebarMenuItem>

            <CDBSidebarMenuItem
              onClick={() => setSelectedTable("Show")}
              icon="edit"
              iconType="solid"
            >
              Show Ingredients
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <hr />

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
            <p>&copy; {new Date().getFullYear()} Zaika (The Recipe)</p>
          </div>
          <hr />
          <br />
        </CDBSidebarFooter>
        <ToastContainer />
      </CDBSidebar>

      {selectedTable === "users" && renderUsersTable()}
      {selectedTable === "recipes" && renderRecipesTable()}
      {selectedTable === "feedback" && renderFeedbackTable()}
      {selectedTable === "upload" && UserRecpieUpload()}
      {selectedTable === "Meal" && UserMeal()}
      {selectedTable === "Sell" && SellIngredients()}
      {selectedTable === "Show" && ShowIngredients()}
    </>
  );
};
export default Dasboard;
