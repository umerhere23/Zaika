import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchUserDetails, updateUserDetails, fetchUserRecipes, removeRecipe } from '../Service/api';
import { useLocation, Link, Navigate ,useNavigate} from 'react-router-dom';
import { fetchAllFeedbacks,removefeedback } from '../Service/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StarRating from '../components/icons/stars.jsx'; 
import { Table } from 'react-bootstrap';
import "./CSS/Dashboard.css";
import LoadingSpinner from '../components/loading.jsx';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [userRecipes, setUserRecipes] = useState([]);
    const location = useLocation();
    const userEmail = location.state?.userEmail;
    const userName = userData?.Username || '';
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

  const [feedbackdetails, setFeedbackDetails] = useState([]);

  const fetchData1 = async () => {
    try {
      const result = await fetchAllFeedbacks(); 
      setFeedbackDetails(result);
    } catch (error) {
      console.error('Error:', error);
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

    useEffect(() => {
        const fetchData = async () => {

            await new Promise(resolve => setTimeout(resolve, 500));

            setIsLoading(false);
        };

        fetchData();
    }, []);

    const fetchUserRecipesData = async (userName) => {
        try {
            const recipes = await fetchUserRecipes(userName);
            setUserRecipes(recipes);
        } catch (error) {
            console.error('Error fetching user recipes:', error);
            toast.error('Failed to fetch user recipes');
        }
    };

    const handleRemoveFeedback = async(_id) => {
        try {
            await removefeedback(_id);

            const updatedfeedback = feedbackdetails.filter(feedbackData => feedbackData._id !== _id);
            setFeedbackDetails(updatedfeedback);

            console.log("feedback removed successfully");
        } catch (error) {
            console.error('Error removing feedback:', error);
        }      };
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (!isLoggedIn()) {
                event.returnValue = true;
                return true;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const isLoggedIn = () => {
        const token = localStorage.getItem("userToken");
        return !!token;
    };
    const handleRemoveRecipe = async (recipeId) => {
        try {
            await removeRecipe(recipeId);

            const updatedRecipes = userRecipes.filter(recipe => recipe._id !== recipeId);
            setUserRecipes(updatedRecipes);

            toast.success("Recipe removed successfully");
        } catch (error) {
            console.error('Error removing recipe:', error);
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
            console.error('Error:', error);
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
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error('Error updating user details:', error);
            toast.error("Failed to update user data");
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const handleRecipeClick = (userData) => {
        navigate(`/AddRecpie/${userData._id}`, {
          state: {
            Username: userData.Username,
            useremail: userData.email,
          }
        });
      };
      
    console.log(userData)
    return (
        <>

<div className="container py-5">
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Welcome to Your User Profile!</h4>
          <p>
            We're excited to have you here. This is your personal space where you can manage and update your profile
            information. Feel free to explore and make any changes you need.
          </p>
          <hr />
          <p className="mb-0">
            If you have any questions or need assistance, don't hesitate to reach out. Enjoy your time in your user
            profile!
          </p>
        </div>
                <ul class="nav">
                    
                    <li class="nav-item">
                    {/* <Link to={{ pathname: "/AddRecpie", state: { userId: userData?._id } }} className="navbar-brand">
  AddRecipe
</Link> */}

<div className="col-md-4 mb-4" key={userData._id} onClick={() => handleRecipeClick(userData)}>
  AddRecipe
</div>



                   </li> &nbsp;&nbsp;&nbsp;

                    <li class="nav-item">
                        <a class="navbar-brand " href="#recp" >User Recipes</a>
                    </li> &nbsp;&nbsp;&nbsp;
                    <li class="nav-item">
                        <a class="navbar-brand " href="#fb">UserFeedbacks</a>
                    </li> &nbsp;&nbsp;&nbsp;
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
                {userData ? (
                    <div className='new'>
                        {editMode ? (
                            <form onSubmit={handleFormSubmit} className="max-w-md mx-auto">
                                <table className="table">
                                    <tbody>
                                        <tr className='square border border-warning'>
                                            <th colSpan={"2"} style={{ textAlign: "center" }}>Edit User Profile</th>
                                        </tr>
                                        <tr>
                                            <th className="text-lg font-bold text-gray-700">Id:</th>
                                            <td className="text-gray-800">{userData._id}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-lg font-bold text-gray-700">Username:</th>
                                            <td className="text-gray-800">{userData.Username}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-lg font-bold text-gray-700">Email:</th>
                                            <td className="text-gray-800">{userData.email}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-lg font-bold text-gray-700">Address:</th>
                                            <td><input type="text" className="form-control" value={userData.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} /></td>
                                        </tr>
                                        <tr>
                                            <th className="text-lg font-bold text-gray-700">City:</th>
                                            <td><input type="text" className="form-control" value={userData.city} onChange={(e) => setUserData({ ...userData, city: e.target.value })} /></td>
                                        </tr>
                                        <tr>
                                            <th className="text-lg font-bold text-gray-700">State:</th>
                                            <td><input type="text" className="form-control" value={userData.state} onChange={(e) => setUserData({ ...userData, state: e.target.value })} /></td>
                                        </tr>
                                        <tr>
                                            <th className="text-lg font-bold text-gray-700">Zip:</th>
                                            <td><input type="text" className="form-control" value={userData.zip} onChange={(e) => setUserData({ ...userData, zip: e.target.value })} /></td>
                                        </tr>
                                        <tr>
                                            <th className="text-lg font-bold text-gray-700">Account Created On:</th>
                                            <td className="text-gray-800">{new Date(userData.createdAt).toLocaleString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="text-center mt-4">
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <table className="table">
                                                <tbody>
                                                    <tr className='square border border-warning'>
                                                        <th colSpan={"2"} style={{ textAlign: "center" }}> User Profile Data</th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-lg font-bold text-gray-700">Id:</th>
                                                        <td className="text-gray-800">{userData._id}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-lg font-bold text-gray-700">Name:</th>
                                                        <td className="text-gray-800">{userData.Username}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-lg font-bold text-gray-700">Email:</th>
                                                        <td className="text-gray-800">{userData.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-lg font-bold text-gray-700">Address:</th>
                                                        <td className="text-gray-800">{userData.address}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-lg font-bold text-gray-700">City:</th>
                                                        <td className="text-gray-800">{userData.city}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-lg font-bold text-gray-700">State:</th>
                                                        <td className="text-gray-800">{userData.state}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-lg font-bold text-gray-700">Zip:</th>
                                                        <td className="text-gray-800">{userData.zip}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-lg font-bold text-gray-700">Account Created On:</th>
                                                        <td className="text-gray-800">{new Date(userData.createdAt).toLocaleString()}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
                <div className="flex justify-center mt-4 btnedit">
                    <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-blue font-bold py-2 px-4 rounded">
                        {editMode ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                <div className="row justify-content-center" id='recp'>
                    <div className="container py-5">
                        {userRecipes.length > 0 ? (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th colSpan={4} style={{ textAlign: "center" }} className='txt2'> <h4>User Recipes</h4>   </th>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <th>Ingredients</th>
                                        <th>Instructions</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userRecipes.map((recipe) => (
                                        <tr key={recipe._id}>
                                            <td>{recipe.name}</td>
                                            <td>{recipe.ingredients}</td>
                                            <td>{recipe.instructions}</td>
                                            <td>
                                                <span
                                                    className='icons'
                                                    style={{ cursor: 'pointer', color: 'red' }}
                                                    onClick={() => handleRemoveRecipe(recipe._id)}
                                                >
                                                    <b> &#x1F5D1;</b>
                                                </span>
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
            </div>
         <div>
      <div className="row justify-content-center" id='fb'>
      <div className="container py-5">
      <Table striped bordered hover responsive className="table">
      <thead className="thead-dark">
        <tr>
          <th colSpan={5} style={{ textAlign: "center" }} className='txt2'>
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
        {feedbackdetails.map((feedback, index) => (
          feedback.email === userData.email ? (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><StarRating rating={feedback.rating} /></td>
              <td>{feedback.feedbackText}</td>
              <td>{feedback.email} </td>
              <td>
                <button
                  type="button"
                  className="btn "
                  onClick={() => handleRemoveFeedback(feedback._id)}
                >
                  <b> &#x1F5D1;</b>
                </button>
              </td>
            </tr>
          ) : null
        ))}
      </tbody>
    </Table>
        </div>
      </div>
    </div>

    
            <footer className=" text-white p-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h5>About Us</h5>
                            <p>Zaika Recipes is a proposed website that aims to provide a platform for food lovers to access and share recipes. The website will include an extensive collection of recipes from various cuisines and cultures. The main objective of the website is to provide a user-friendly interface that allows users to search, explore, share their favourite recipes and delivery of food.</p>
                        </div>
                        <div className="col-md-4">
                            <h5>Quick Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Services</a></li>

                                <li><a href="#">Portfolio</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="/signup">Signup</a></li>
                                <li><a href="/AddRecpie">AddRecipe</a></li>
                                <li><a href="/login">Login</a></li>
                                <li><a href="/dashboard">Dashboard</a></li>




                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5>Contact Us</h5>
                            <address>
                                <p>Cui atd</p>
                                <p>Abbottabad, Pkaistan</p>
                                <p>Email: omerjh5004@gamil.com</p>
                            </address>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="row">
                        <div className="col-md-6">
                            <p>&copy; {new Date().getFullYear()} Zaika(The Recipie)</p>
                        </div>
                        <div className="col-md-6">
                            <ul className="list-inline float-md-end">
                                <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                                <li className="list-inline-item"><a href="#">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>        </>
    );
};

export default Dashboard;
