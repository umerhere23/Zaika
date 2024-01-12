import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { MdCheckCircle, MdDelete } from "react-icons/md";
import { Bar } from "react-chartjs-2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faBan,
  faCheckCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {
  fetchAllUsers,
  blockUser,
  deleteUser,
  unblockUser,
  removeRecipe,
  fetchRecipes,
  fetchAllorder
} from "../Service/api";
import Footer from "./footer";
import "../components/CSS/AdminDasboard.css";
import { fetchAllFeedbacks, removefeedback,deleteIngredient,AddIngredients,markOrderAsComplete,DeleteOrder } from "../Service/api";
import StarRating from "../components/icons/stars.jsx";
import { Table } from "react-bootstrap";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
import { MDBCard, MDBContainer, MDBCardBody, MDBInput } from "mdb-react-ui-kit";

const AdminDasboard = () => {
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedTable, setSelectedTable] = useState("users");
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [ingdetails, setingDetails] = useState([]);
  const [orders, setOrders] = useState([]);

  const [UserDetails, setUserDetails] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);

  useEffect(() => {
    fetchDatas();
    fetchIngredients(); 
  }, []);
  useEffect(() => {
    const filtered = ingdetails.filter(
      (ingredient) => ingredient.seller.length>=0
    );
    setFilteredIngredients(filtered);
  }, [ingdetails]);
  const fetchDatas = async () => {
    try {
      const usersResult = await fetchAllUsers();
      const recipesResult = await fetchRecipes();
      setUserDetails(usersResult);
      setAllRecipes(recipesResult);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [feedbackdetails, setFeedbackDetails] = useState([]);

  const fetchData1 = async () => {
    try {
      const result = await fetchAllFeedbacks();
      setFeedbackDetails(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchIngredients = async () => {
    try {
      const ingredientsResult = await AddIngredients();
      setAllIngredients(ingredientsResult);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      toast.error("Failed to fetch ingredients", { autoClose: 500 });
    }
  };
  const chartData = {
    labels: ["Product A", "Product B", "Product C", "Product D", "Product E"],
    datasets: [
      {
        label: "Orders",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 81, 56], // Replace with your actual data
      },
    ],
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
  useEffect(() => {
  {
      fetchOrder();
    }
  }, []);

  const fetchOrder = async () => {
    try {
      const result = await fetchAllorder();
      setOrders(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData1();
  }, []);
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
  const handleRemoveFeedback = async (_id) => {
    try {
      await removefeedback(_id);

      const updatedfeedback = feedbackdetails.filter(
        (feedbackData) => feedbackData._id !== _id
      );
      setFeedbackDetails(updatedfeedback);

      toast.success("feedback removed successfully",{autoClose:500});
    } catch (error) {
      toast.error("Error removing feedback:", error);
    }
  };
  const handleDeleteAccount = async (_id) => {
    try {
      await deleteUser(_id);
      toast.success("Account deleted successfully", { autoClose: 500 });
      const result = await fetchAllUsers();
      setUserDetails(result);
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account", { autoClose: 500 });
    }
  };

  const handleBlockAccount = async (_id) => {
    try {
      const userToBlock = UserDetails.find((user) => user._id === _id);

      if (userToBlock.isBlocked) {
        await unblockUser(_id);
        toast.success("Account unblocked successfully", { autoClose: 500 });
      } else {
        await blockUser({ _id, action: true });
        toast.success("Account blocked successfully", { autoClose: 500 });
      }

      const result = await fetchAllUsers();
      setUserDetails(result);
    } catch (error) {
      console.error("Error handling account block/unblock:", error);
      toast.error("Failed to update account status", { autoClose: 500 });
    }
  };

  const handleRemoveRecipe = async (recipeId) => {
    try {
      await removeRecipe(recipeId);

      const updatedRecipes = await fetchRecipes();
      setAllRecipes(updatedRecipes);

      toast.success("Recipe removed successfully", { autoClose: 500 });
    } catch (error) {
      toast.error("Error removing recipe:", error);
    }
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
const renderorders =()=>{
  return(
    <>
     <div
        className="row justify-content "
       
        style={{ width: "140%", fontSize: "1.9vh" ,marginTop:"-53%",marginLeft:"16%"}}
      >
<br />
<div className="searchbar" style={{marginLeft:"50%",width:"30%"}}>  <input
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
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th >Address</th>
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
          {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.firstName}</td>
                <td>{order.lastName}</td>
                <td >{order.address}</td>
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
      
    </>
  )
}

const filteredUsers = UserDetails.filter((user) =>
user.Username.toLowerCase().includes(searchTerm.toLowerCase())
);

  const renderUsersTable = () => {
    return (
      <>
        <br />
        <div className="tables " style={{marginLeft:"16%",marginTop:"-55%",width:"140%",fontSize: "1.9vh" }} >

        <input
          type="text"
          placeholder="Search by Username"
          value={searchTerm}
          style={{marginLeft:"90%",border:"none"}}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          <table className="table" >
            <thead>
              <th
                scope="col"
                colSpan={10}
                style={{ textAlign: "center" }}
                className="txt2"
              >
                <h4>Users</h4>
              </th>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User Id</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">City</th>
                <th scope="col">Since</th>
                <th scope="col">Last Profile Update</th>
                <th scope="col">Delete Account</th>
                <th scope="col">Block Account </th>
                <th scope="col"> Account Status </th>
              </tr>
            </thead>
            <tbody>
            {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <th className="tds" scope="row">
                    {index + 1}
                  </th>
                  <td>{user._id}</td>
                  <td>{user.Username}</td>
                  <td>{user.email}</td>
                  <td>{user.city}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>{new Date(user.updatedAt).toLocaleString()}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteAccount(user._id)}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faBan}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleBlockAccount(user._id)}
                    />
                  </td>
                  <td>
                    {user.isBlocked ? (
                      <FontAwesomeIcon icon={faBan} className="text-danger" />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-success"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />

      </>
    );
  };

  const [filterValue, setFilterValue] = useState("");
  const filteredRecipes = allRecipes.filter((details) => {
    const matchesFilter = (
      details._id.toLowerCase().includes(filterValue.toLowerCase()) ||
      details.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      details.userName.toLowerCase().includes(filterValue.toLowerCase())
    );
    return matchesFilter;
  });

  const renderRecipesTable = () => {
    return (
      <>
      <br />
        <div className="row  " style={{marginLeft:"16%",marginTop:"-55%",width:"140%",fontSize: "1.9vh" }} >
        <input
          type="text"
          placeholder="Filter by ID, Recipe Name, or User Name"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          style={{width:"15%",marginLeft:"80%"}}
        />
          <table className="table "  >
            <thead>
              <th
                scope="col"
                colSpan={10}
                style={{ textAlign: "center" }}
                className="txt2"
              >
                <h4>Recpies</h4>
              </th>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Ingredients</th>
                <th scope="col">Instructions</th>
                <th scope="col">TimeToCook</th>
                <th scope="col">Delete Recipe</th>
              </tr>
            </thead>
            <tbody>
            {filteredRecipes.map((details, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{details.name}</td>
                  <td>{details.userName}</td>
                  <td>{details.email}</td>
                  <td>{details.ingredients}</td>
                  <td>{details.instructions}</td>
                  <td>{details.timeToCook}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemoveRecipe(details._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
        </div>
      </>
    );
  };

  const renderFeedbackTable = () => {
    return (
      <>
        <div className="row fdb" style={{marginLeft:"30%",marginTop:"-55%",fontSize: "1.9vh" }} >
          <div className="container p-3 ">
            
            <Table striped bordered hover responsive className="table" style={{width:"90%"}}>
              <thead className="thead-dark">
                <tr>
                  <th
                    colSpan={6}
                    style={{ textAlign: "center" }}
                    className="txt2"
                  >
                    <h4>User Feedbacks</h4>
                  </th>
                </tr>
                <tr>
                  <th>#</th>
                  <th>Recpie ID</th>

                  <th>Rating</th>
                  <th>Feedback</th>
                  <th>Email</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {feedbackdetails.map((feedback, index) => (
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
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveFeedback(feedback._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <ToastContainer />

      </>
    );
  };
const renderIngredient =()=>{
  return(
    <>
    <div className="container " id="ingredientss " style={{marginLeft:"30%",marginTop:"34%"}} >
      <div className="row ingred" >
      {allIngredients.map((ingredient, index) => (  
         <div key={index} className="col-md-6 mb-3 ">       
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
}
  return (
    <>
      <CDBSidebar
        className="CDBSidebar"
        style={{
          background: "  #001827",
          height: "110%",
          maxHeight: "11900vh",
          overflowY: "auto",
        }}      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          Admin Dasbaord
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem
              onClick={() => setSelectedTable("users")}
              icon="users"
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
              onClick={() => setSelectedTable("Ingredient")}
              icon="square"
              iconType="solid"
            >
              Store Items
            </CDBSidebarMenuItem>

            <CDBSidebarMenuItem
              onClick={() => setSelectedTable("Orders")}
              icon="box"
              iconType="solid"
            >
              Orders  Record
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <hr />
        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
            <p>&copy; {new Date().getFullYear()} Zaika(The Recipie)</p>
          </div>
        </CDBSidebarFooter>
        <hr />
      </CDBSidebar>

      <div style={{ padding: "20px" }} className="AdminContent">
        {selectedTable === "users" && renderUsersTable()}
        {selectedTable === "recipes" && renderRecipesTable()}
        {selectedTable === "feedback" && renderFeedbackTable()}
        {selectedTable === "Ingredient" && renderIngredient()}
        {selectedTable === "Orders" && renderorders()}


      </div>

      <ToastContainer />
    </>
  );
};
export default AdminDasboard;
