import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CRow, CCol, CWidgetStatsB } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBan, faCheckCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import "./CSS/Dashboard.css";
import { onAddRecipe } from '../Service/api';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Footer from './footer';
import StarRating from '../components/icons/stars.jsx'; 
import { Table } from 'react-bootstrap';
import "./CSS/Dashboard.css";
import { fetchUserDetails, updateUserDetails, fetchUserRecipes, removeRecipe } from '../Service/api';
import { useLocation, Link, Navigate ,useNavigate} from 'react-router-dom';
import { fetchAllFeedbacks,removefeedback } from '../Service/api';
import imgsucess from "../components/img/tikpic.png"
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import { CDBInput, CDBCard, CDBCardBody, CDBIcon, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';

const Dasboard = () => {
    const location = useLocation();

    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [userRecipes, setUserRecipes] = useState([]);
    const userEmail = location.state?.userEmail;
    const Uname =location.state?.username

    const userName = userData?.Username || '';
    const navigate = useNavigate();

  const [feedbackdetails, setFeedbackDetails] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [selectedTable, setSelectedTable] = useState('users');
  
  

    const [recipedata, setRecipe] = useState({
        name: '',
        ingredients: '',
        instructions: '',
        image: null,
        timeToCook: '',
        UserName:Uname ,
        email: userEmail || '',
      });
  console.log(Uname)

  
    const [errors, setErrors] = useState({});

    
    const [isSubmitted, setIsSubmitted] = useState(false); 
  const{name,ingredients,instructions,image,timeToCook,UserName,email}=recipedata;
  const handleChange = (e) => {
    setRecipe({ ...recipedata, [e.target.name]: e.target.value });
  };
  
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
    
   
        const addDetails = async (e) => {
            e.preventDefault();
          
            if (validateForm()) {
              const basePath = '../img';
              const fileName = `${recipedata.name.replace(/\s+/g, '_')}.jpg`; 
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
          
                toast.success('Recipe submitted successfully!',  { autoClose: 500 });

                setRecipe({
                    name: '',
                    ingredients: '',
                    instructions: '',
                    image: null,
                    timeToCook: '',
                    UserName: Uname,
                    email: userEmail || '',
                  });
                  setErrors({});
                  setIsSubmitted(true);

              } catch (error) {
                console.error('Error submitting recipe:', error);
                toast.error('Error submitting recipe. Please try again.');
              }
          
            }
          };
          

        const handleImageChange = (e) => {
            const imageFile = e.target.files[0];
          
            if (imageFile) {
              const reader = new FileReader();
          
              reader.onload = (event) => {
                const base64String = event.target.result;
                setRecipe({ ...recipedata, image: imageFile, imageString: base64String });
              };
          
              reader.readAsDataURL(imageFile);
            }
          };
        
          const validateForm = () => {
              let errors = {};
      
              if (!name.trim()) {
                  errors.name = "Name is required";
              } else if (name.length < 6){
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
          }
        const fetchUserRecipesData = async (userName) => {
            try {
                const recipes = await fetchUserRecipes(userName);
                setUserRecipes(recipes);
            } catch (error) {
                console.error('Error fetching user recipes:', error);
                toast.error('Failed to fetch user recipes');
            }
        };
    
        const handleRemoveFeedback = async (_id) => {
            try {
              await removefeedback(_id);
        
              const updatedfeedback = feedbackdetails.filter(feedbackData => feedbackData._id !== _id);
              setFeedbackDetails(updatedfeedback);
        
              toast.success('Feedback removed successfully', { autoClose: 500 });
            } catch (error) {
              console.error('Error removing feedback:', error);
              toast.error('Error removing feedback', { autoClose: 500 });
            }
          };
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
    
                toast.success("Recipe removed successfully", { autoClose: 500 });
            } catch (error) {
                console.error('Error removing recipe:', error, { autoClose: 500 });
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
                toast.success("Profile updated successfully", { autoClose: 500 });
            } catch (error) {
                console.error('Error updating user details:', error);
                toast.error("Failed to update user data");
            }
        };
    
     
    
     
          
    

        const UserRecpieUpload = () => {
            return (
             <>
             {isSubmitted ? ( 
                <div className="text-center Sucessmsg">
                    <img src={imgsucess} alt=""  style={{width:"5%"}}/>
                    <h2>Thank you for your submission!</h2>
                    <p>Your recipe has been added.</p>
                    <button  className="btn btn-primary btt"> <a href='/dashboard'>Save Changes</a></button>

                </div>
        ) : (
              <CDBContainer className='Formrecp'>
                <CDBCard style={{ width: '30rem' }}>
                  <CDBCardBody className="mx-4">
                    <div className="text-center mt-4 mb-2">
                      <h2>Add Recipe</h2>
                    </div>
                    <div className="form-flex-row mb-n4">
                      <div className="col">
                        <CDBInput
                          material
                          placeholder={errors.name ? errors.name : 'Name of recipe'}
                          type="text"                         
                          name="name"
                          value={name}
                          onChange={(e) => handleChange(e)}
                          required              style={{ borderColor: errors.name ? 'red' : '' }}

                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>
                    </div>
          
                    <CDBInput
                      material
                      placeholder={errors.ingredients ? errors.ingredients : 'Step to make ingredients'}
                      type="text"
                      name="ingredients"
                      value={ingredients}
                      onChange={(e) => handleChange(e)}
                      required              style={{ borderColor: errors.name ? 'red' : '' }}

                    />
                    {errors.ingredients && (
                      <div className="invalid-feedback">{errors.ingredients}</div>
                    )}
          
                    <CDBInput
                      material
                      placeholder={errors.instructions ? errors.instructions : 'Instructions'}
                      type="text"
                      name="instructions"
                      value={instructions}
                      onChange={(e) => handleChange(e)}
                      style={{ borderColor: errors.name ? 'red' : '' }}

                      required
                    />
                    {errors.instructions && (
                      <div className="invalid-feedback">{errors.instructions}</div>
                    )}
          
                    <CDBInput
                      material
                      placeholder={errors.timeToCook ? errors.timeToCook : 'Time to cook (mins)'}
                      type="number"
                      name="timeToCook"
                      value={timeToCook}
                      onChange={(e) => handleChange(e)}
                      required              style={{ borderColor: errors.name ? 'red' : '' }}

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
                          style={{ width: '100px', height: '100px' }}
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
                    <button className="btn btn-primary1" onClick={(e) => addDetails(e)}>Apply</button>

                    </div>
                  </CDBCardBody>
                </CDBCard>
              </CDBContainer>)}
             </>
            );
          };


const renderUsersTable = () => {
  return (
    <>
    <br />
    {userData ? (
                    <div className='new users1'>
                        {editMode ? (
                            <form onSubmit={handleFormSubmit} className="max-w-md mx-auto tte">
                                <table className="table  ">
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
                <button type="submit" className="btn btn-primary mr-2">Save Changes</button> &nbsp;
                <button type="button" onClick={handleEditClick} className="btn btn-danger">Cancel</button>
              </div>
                            </form>
                        ) : (
                            <div>
                                <div className="container prof">
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
                                <div className="flex justify-center mt-4 btnedit">
                <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-blue font-bold py-2 px-4 rounded">
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
    
    <div className="row justify-content-center " id='recp'>
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
        <div className='feedbackUsers'> 
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
              <FontAwesomeIcon
                          icon={faTrash}
                  type="button"
                  className="btn "
                  onClick={() => handleRemoveFeedback(feedback._id)}
                />
          
              </td>
            </tr>

            
          ) : null
        ))}
      </tbody>
    </Table>
        </div>
      </div>
    </div>

    
    </>
  );
};

return (
  <>
 

 <CDBSidebar className='CDBSidebar'style={{background:"  #001827" , height: "150%", maxHeight: "1190vh", overflowY: "auto" }}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>User Dasbaord</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem onClick={() => setSelectedTable('users')} icon="user">Users</CDBSidebarMenuItem>
            <CDBSidebarMenuItem onClick={() => setSelectedTable('recipes')} icon="sticky-note">Recipes</CDBSidebarMenuItem>
            <CDBSidebarMenuItem onClick={() => setSelectedTable('feedback')} icon="star" iconType="solid">
              Feedback
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem onClick={() => setSelectedTable('upload')} icon="plus" iconType="solid">
              Upload Recpie
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
<hr />
<CDBSidebarFooter style={{ textAlign: 'center' }}>
    <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }}>
      <p>&copy; {new Date().getFullYear()} Zaika (The Recipe)</p>
    </div>
  </CDBSidebarFooter>
        <ToastContainer />

      </CDBSidebar>

      {selectedTable === 'users' && renderUsersTable()}
      {selectedTable === 'recipes' && renderRecipesTable()}
      {selectedTable === 'feedback' && renderFeedbackTable()}
      {selectedTable === 'upload' && UserRecpieUpload()}

    
    </>
);
};
export default Dasboard;
