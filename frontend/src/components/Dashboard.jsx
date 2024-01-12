import React, { useEffect, useState } from "react";
import { MdCheckCircle, MdDelete } from "react-icons/md";

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

import { MDBCard, MDBContainer, MDBCardBody, MDBInput } from "mdb-react-ui-kit";

import {
  fetchUserDetails,
  updateUserDetails,
  fetchUserRecipes,
  removeRecipe,
} from "../Service/api";
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import {
  fetchAllFeedbacks,
  removefeedback,
  AddIngredients,
  onAddRecipe,
  fetchorder,
  deleteIngredient,
  addIngredientPack,
  markOrderAsComplete,
  DeleteOrder,
} from "../Service/api";
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
  const [imageLink, setImageLink] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setFormData({ ...formData, image: reader.result });
        };
      } catch (error) {
        console.error("Error reading image:", error);
      }
    }
  };
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
  const MEALS_DATA = {
    Breakfast: [
      { name: "Oatmeal", calories: "150" },
      { name: "Pancakes", calories: "300" },
      { name: "Scrambled Eggs", calories: "200" },
      { name: "Greek Yogurt with Honey", calories: "180" },
      { name: "Avocado Toast", calories: "250" },
      { name: "Smoothie Bowl", calories: "220" },
      { name: "French Toast", calories: "350" },
    ],
    Lunch: [
      { name: "Salad", calories: "200" },
      { name: "Burger", calories: "500" },
      { name: "Sushi", calories: "300" },
      { name: "Grilled Chicken Sandwich", calories: "400" },
      { name: "Veggie Wrap", calories: "350" },
      { name: "Pasta Salad", calories: "330" },
      { name: "Quinoa Bowl", calories: "380" },
    ],
    Dinner: [
      { name: "Pasta", calories: "400" },
      { name: "Steak", calories: "600" },
      { name: "Grilled Salmon", calories: "450" },
      { name: "Vegetable Stir Fry", calories: "350" },
      { name: "Chicken Curry", calories: "500" },
      { name: "Beef Tacos", calories: "480" },
      { name: "Stuffed Bell Peppers", calories: "410" },
    ],
  };
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
    image: "",
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
    }
  };
  const [mealOptions, setMealOptions] = useState([]);
  useEffect(() => {
    setMealOptions(MEALS_DATA[mealType]);
  }, [mealType]);
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
  const handleChange = async (e) => {
    if (e.target.type === 'file') {
      const selectedFile = e.target.files[0];
  
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
  
          setRecipe({ ...recipedata, [e.target.name]: dataUrl });
  
          setImageLink(dataUrl);
        };
        reader.readAsDataURL(selectedFile);
      }
    } else {
      setRecipe({ ...recipedata, [e.target.name]: e.target.value });
    }
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
 

  const addDetails = async (e) => {
    e.preventDefault();

    if (validateForm()) {
     

      try {
        await onAddRecipe(recipedata);

        toast.success("Recipe submitted successfully!", { autoClose: 500 });

        setRecipe({
          name: "",
          ingredients: "",
          instructions: "",
          imageLink: imageLink,
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

 
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const filtered = ingdetails.filter(
      (ingredient) => ingredient.seller === Uname
    );
    setFilteredIngredients(filtered);
  }, [ingdetails]);
  const fetchData = async () => {
    try {
      const result = await AddIngredients();
      setingDetails(result);
    } catch (error) {
      console.error("Error:", error);
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

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (Uname) {
      fetchOrder(Uname);
    }
  }, [Uname]);

  const fetchOrder = async (Uname) => {
    try {
      const result = await fetchorder(Uname);
      setOrders(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };


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

  const handleDeleteOrder = async (_id) => {
    try {
      const orderIndex = orders.findIndex((order) => order._id === _id);

      if (orderIndex === -1) {
        throw new Error(`Order with ID ${_id} not found`);
      }

      await DeleteOrder(_id);

      const updatedOrders = orders.filter((order) => order._id !== _id);
      setOrders(updatedOrders);

      toast.success("Order removed successfully", { autoClose: 500 });
    } catch (error) {
      console.error("Error removing order:", error);
      toast.error("Failed to remove order", { autoClose: 500 });
    }
  };

  const handleCompleteOrder = async (_id) => {
    try {
      const orderIndex = orders.findIndex((order) => order._id === _id);

      if (orderIndex === -1) {
        throw new Error(`Order with ID ${_id} not found`);
      }

      const newStatus = !orders[orderIndex].Completed;

      await markOrderAsComplete({ _id, action: newStatus });

      const updatedOrders = [...orders];
      updatedOrders[orderIndex].Completed = newStatus;
      setOrders(updatedOrders);

      toast.success(
        `Order ${
          newStatus ? "completed" : "marked as incomplete"
        } successfully`,
        { autoClose: 500 }
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status", { autoClose: 500 });
    }
  };

  const handleSubmit = async () => {
    if (
      formData.recipeId === "" ||
      formData.recipeName === "" ||
      formData.totalProducts === "" ||
      formData.details === "" ||
      formData.packName === "" ||
      formData.discount === "" ||
      formData.ingredients.some(
        (ingredient) =>
          ingredient.name === "" ||
          ingredient.quantity === "" ||
          ingredient.price === ""
      ) ||
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
          <div className="text-center Sucessmsg">
            <img src={imgsucess} alt="" style={{ width: "5%" }} />
            <h2>Thank you for your submission!</h2>
            <p>Your recipe has been added.</p>
            <button className="btn btn-primary btt">
              {" "}
              <a href="/dashboard">Save Changes</a>
            </button>
          </div>
        ) : (
          <CDBContainer className="Formrecp" style={{ marginTop: "-70%" }}>
            <CDBCard style={{ width: "30rem" }}>
              <CDBCardBody className="mx-4">
                <div className="text-center mt-4 mb-2">
                  <div
                    className="alert alert-danger d-flex align-items-center"
                    role="alert"
                  >
                    <div>
                      <svg
                        style={{ marginLeft: "0%" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-exclamation-triangle "
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                      </svg>{" "}
                      <br />
                      &nbsp; <b>
                        Use Comma(,) Seprator After Each Ingredients
                      </b>{" "}
                      <br />{" "}
                      <b>USe Comma (,) Seprator After Each Line of Recpie</b>
                    </div>
                  </div>
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

                <textarea
                  className="form-control"
                  placeholder={
                    errors.ingredients
                      ? errors.ingredients
                      : " ingredients (Use Comma After Each Ingredients)"
                  }
                  name="ingredients"
                  value={ingredients}
                  onChange={(e) => handleChange(e)}
                  required
                  style={{ borderColor: errors.name ? "red" : "" }}
                />

                {errors.ingredients && (
                  <div className="invalid-feedback">{errors.ingredients}</div>
                )}

                <textarea
                  className="form-control"
                  placeholder={
                    errors.instructions ? errors.instructions : "Instructions"
                  }
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
 
                    
                {/* <CDBInput
                  material
                  placeholder="Place Image  Url Here "
                  type="text"
                  name="image"
                  value="image"
                  onChange={(e) => handleChange(e)}
                />
                {errors.image && (
                  <div className="invalid-feedback">{errors.image}</div>
                )}
                 */}
               <div>
      <CDBInput
        material
        type="file"
        accept="image/*"
        name="image"
        onChange={(e) => handleChange(e)}
        />
      {imageLink && (
        <div>
        
          <img src={imageLink} alt="Uploaded" className="recpimage" />
        </div>
      )}
    </div>

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
        <div className="container mt-5  " style={{ marginLeft: "10%" }}>

          
          <div
            className="row justify-content-center "
            style={{ marginTop: "-88%" }}
          >
            <div className="col-md-8">
              <div className="" style={{ width: "100%" }}>
                <div className="card-header text-center ">
                  <h5>
                    <b>Add Ingredient Pack</b>
                  </h5>
                  <hr />
                </div>
                <div className="card-body" >
                  <form >
                    <div className="mb-3 ">
                      <label htmlFor="recipeId" className="form-label">
                        Recipe ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipeId"
                        style={{height:"40px"}}
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
                        style={{height:"40px"}}

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
                        style={{height:"40px"}}

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
                                              style={{height:"40px"}}

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
                      <div className="row mb-3" key={index} >
                        <div className="col" >
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
                              Remove {index + 1}
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
                        style={{height:"40px"}}

                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="details" className="form-label">
                        Extra Details
                      </label>
                      <textarea
                        className="form-control"
                        id="details"
                        style={{ height: "70px" }}
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
                        className="form-control "
                        id="seller"
                        value={formData.seller}
                        onChange={(e) =>
                          setFormData({ ...formData, seller: e.target.value })
                        }
                        disabled
                        style={{height:"30px"}}

                      />
                    </div>
                    {/* <div className="mb-3">
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
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        required
                      />
                    </div> */}

<div className="mb-3">
        <label htmlFor="image" className="form-label">
          Image URL:
        </label>
        <input
          type="file"
          className="form-control"
          id="image"
          name="image"
          onChange={handleImageChange}
          accept="image/*" // Allow only image files
          required
        />
        {formData.image && (
          <div>
            <img src={formData.image} alt="" srcset="" />
          </div>
        )}
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
        <div className="row justify-content-center " style={{marginLeft:"10%",marginTop:"-75%",fontSize: "1.9vh" ,width:"80%"}}>
          <div className="container py-5">
            {userRecipes.length > 0 ? (
              <Table striped bordered hover>
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
                    <th>Image</th>

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
                      <td>  <div className="d-flex justify-content-center mb-4">
          <img
            src={recipe.image}
            className="rounded-circle "
            alt="User Avatar"
          />
        </div></td>
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
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [showCompleteOrders, setShowCompleteOrders] = useState(false); // State for showing complete orders
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const matchesSearchTerm =
        order.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.Product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.ProducdID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.TotalPrice.toString().includes(searchTerm.toLowerCase());

      const matchesComplete =
        showCompleteOrders ? order.Completed : true;

      return matchesSearchTerm && matchesComplete;
    });

    setFilteredOrders(filtered);
  }, [orders, searchTerm, showCompleteOrders]);
  const Showorders = () => {
    return (
      <div
        className="row justify-content"
        
        style={{ marginLeft: "12%", width: "79%", fontSize: "1.9vh",marginTop:"-70%" }}
      >
<div className="searchbar" style={{marginLeft:"50%"}}>  <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <label> &nbsp;&nbsp;&nbsp;
        <input
          type="checkbox"
          checked={showCompleteOrders}
          onChange={() => setShowCompleteOrders(!showCompleteOrders)}
        />
        Show Complete Orders Only
      </label></div>
        
        <Table striped bordered hover>

       
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Product</th>
              <th>Product ID</th>
              <th>Price</th>
              <th>Complete Date</th>

              <th>Complete</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
 {filteredOrders.map((order) => (              <tr key={order.id}>
                <td>{order.firstName}</td>
                <td>{order.lastName}</td>
                <td style={{ width: "95%" }}>{order.address}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{order.Product}</td>
                <td>{order.ProducdID}</td>
                <td>{order.TotalPrice}</td>
                <td>{new Date(order.lastUpdated).toLocaleString()}</td>

                <td>
                  <td>
                    {order.Completed === false ? (
                      <FontAwesomeIcon
                        icon={faBan}
                        className="text-danger"
                        onClick={() => handleCompleteOrder(order._id)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-success"
                        onClick={() => handleCompleteOrder(order._id)}
                      />
                    )}
                  </td>
                </td>
                <td>
                  <MdDelete
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteOrder(order._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  const renderFeedbackTable = () => {
    return (
      <>
        <div className="feedbackUsers">
          <div className="row justify-content-center" style={{marginLeft:"10%",marginTop:"-55%",fontSize: "1.9vh" ,width:"90%"}}>
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
                    <th>id</th>
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
                        <td>{feedback.recipeId}</td>
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
        <Form.Control as="select">
          {mealOptions.map((meal, index) => (
            <option key={index}>
              {meal.name} - {meal.calories} Calories
            </option>
          ))}
        </Form.Control>
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
  const handleDeleteIngredient = async (ingredientId) => {
    try {
      console.log(ingredientId);
      await deleteIngredient(ingredientId);

      const updatedIngredients = filteredIngredients.filter(
        (ingredient) => ingredient._id !== ingredientId
      );
      setFilteredIngredients(updatedIngredients);
      toast.success("Ingredient deleted successfully", { autoClose: 500 });
    } catch (error) {
      toast.error("Error deleting ingredient:", { autoClose: 500 });
      toast.log("Failed to delete ingredient", { autoClose: 500 });
    }
  };

  const ShowIngredients = () => {
    return (
      <>
        <div className="container " id="ingred">
          <div className="row  ingred">
            {filteredIngredients.map((ingredient, index) => (
              <div key={index} className="col-md-4 mb-3 ">
                <MDBCard>
                  <div className="card-body ">
                    <img src={ingredient.image} alt="" srcSet="" />
                    <hr />
                    <h5 className="card-title">
                      Pack Name: {ingredient.packName}
                    </h5>
                    <h6 className="card-title" color="black">
                      <b>Recipe Name:</b> {ingredient.recipeName}
                    </h6>
                    <button
                      onClick={() => handleDeleteIngredient(ingredient._id)}
                      className="btn btn-danger  "
                    >
                      Delete
                    </button>
                    <hr />
                    <p className="card-text">
                      <b>Quantity:</b> {ingredient.totalProducts}
                      ,&nbsp;&nbsp;&nbsp;&nbsp;
                      <b>Price:</b> {ingredient.totalPrice}
                      <br />
                      <b>Seller:</b> {ingredient.seller}&nbsp;&nbsp;&nbsp;&nbsp;
                      <b>Discount</b> {ingredient.discount}%
                    </p>
                    <b>Details:</b> {ingredient.details} <br />
                    <b>Product Id:</b> {ingredient._id}
                    {ingredient.ingredients.map(
                      (nestedIngredient, nestedIndex) => (
                        <div key={nestedIndex}>
                          <p>
                            <b>Ingredient:</b> {nestedIngredient.name}
                          </p>
                        </div>
                      )
                    )}
                    <div className="d-flex justify-content-between">
                      {/* <button onClick={() => onViewDetails(ingredient._id)} color="primary"  type="button" class="btn btn-primary">Details</button> */}
                    </div>
                  </div>
                </MDBCard>
              </div>
            ))}
          </div>
        </div>
      </>
    );
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
          src="data:image/jpeg;base64,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"
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

            <CDBSidebarMenuItem
              onClick={() => setSelectedTable("Orders")}
              icon="box"
            >
              Orders{" "}
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
      {selectedTable === "Orders" && Showorders()}
    </>
  );
};
export default Dasboard;
