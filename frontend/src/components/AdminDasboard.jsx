import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { CRow, CCol, CWidgetStatsB } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { fetchAllUsers, blockUser, deleteUser, unblockUser, removeRecipe, fetchRecipes } from '../Service/api';
import Footer from './footer';
import '../components/CSS/AdminDasboard.css';
import { fetchAllFeedbacks,removefeedback } from '../Service/api';
import StarRating from '../components/icons/stars.jsx'; 
import { Table } from 'react-bootstrap';
const AdminDasboard = () => {
  const location = useLocation();
  const userEmail = location.state?.userEmail;
const [showSidebar, setShowSidebar] = useState(false);

  const [UserDetails, setUserDetails] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = async () => {
    try {
      const usersResult = await fetchAllUsers();
      const recipesResult = await fetchRecipes();
      setUserDetails(usersResult);
      setAllRecipes(recipesResult);
    } catch (error) {
      console.error('Error:', error);
    }
  };
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

  const handleRemoveFeedback = async(_id) => {
    try {
        await removefeedback(_id);

        const updatedfeedback = feedbackdetails.filter(feedbackData => feedbackData._id !== _id);
        setFeedbackDetails(updatedfeedback);

        console.log("feedback removed successfully");
    } catch (error) {
        console.error('Error removing feedback:', error);
    }      };
  const handleDeleteAccount = async (_id) => {
    try {
      await deleteUser(_id);
      toast.success('Account deleted successfully', { autoClose: 500 });
      const result = await fetchAllUsers();
      setUserDetails(result);
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account', { autoClose: 500 });
    }
  };

  const handleBlockAccount = async (_id) => {
    try {
      const userToBlock = UserDetails.find((user) => user._id === _id);

      if (userToBlock.isBlocked) {
        await unblockUser(_id);
        toast.success('Account unblocked successfully', { autoClose: 500 });
      } else {
        await blockUser({ _id, action: true });
        toast.success('Account blocked successfully', { autoClose: 500 });
      }

      const result = await fetchAllUsers();
      setUserDetails(result);
    } catch (error) {
      console.error('Error handling account block/unblock:', error);
      toast.error('Failed to update account status', { autoClose: 500 });
    }
  };

  const handleRemoveRecipe = async (recipeId) => {
    try {
      await removeRecipe(recipeId);

      const updatedRecipes = await fetchRecipes();
      setAllRecipes(updatedRecipes);

      toast.success('Recipe removed successfully', { autoClose: 500 });
    } catch (error) {
      console.error('Error removing recipe:', error);
    }
  };

  return (
    <>
     <div className={`wrapper ${showSidebar ? 'sidebar-open' : ''}`}>
      <br />
      <br />
     
      <div className="wrapper">
        <div id="content">
        <div className="container-fluid">
        <CCol xs={6} className="d-flex justify-content-end align-items-center">
      <button type="button" className="btn btn-primary position-relative">
       <b>Admin Login:</b> {userEmail}{' '}
        <span className="position-absolute top-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle">
          <span className="visually-hidden"></span>
        </span>
      </button>
    </CCol>
  <CRow>
    <CCol xs={6}>
      <h3>Total Visitors Of Website</h3>
      <CWidgetStatsB
        className="mb-3"
        progress={{ color: 'success', value: 75 }}
        text="Preview Website "
        title="Users Clicks"
        value="89"
      />
    </CCol>
   
  </CRow>
</div>

          <div className="tables">
            <h5 className="fontst">All Users</h5>
            
            <table className="table tb ">
              <thead>
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
                {UserDetails.map((user, index) => (
                  <tr key={index}>
                    <th className='tds' scope="row">{index + 1}</th>
                    <td>{user._id}</td>
                    <td>{user.Username}</td>
                    <td>{user.email}</td>
                    <td>{user.city}</td>
                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                    <td>{new Date(user.updatedAt).toLocaleString()}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteAccount(user._id)}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faBan}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleBlockAccount(user._id)}
                      />
                    </td>
                    <td>
                      {user.isBlocked ? (
                        <FontAwesomeIcon icon={faBan} className="text-danger" />
                      ) : (
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="row">
            <h5 className="fontst">All Recpies</h5>

              <table className="table tb">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Id</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Ingredients</th>
                    <th scope="col">Instructions</th>
                    <th scope="col">TimeToCook</th>
                    <th scope="col">Delete Recipe</th>
                  </tr>
                </thead>
                <tbody>
                  {allRecipes.map((details, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{details._id}</td>
                      <td>{details.userName}</td>
                      <td>{details.email}</td>
                      <td>{details.ingredients}</td>
                      <td>{details.instructions}</td>
                      <td>{details.timeToCook}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleRemoveRecipe(details._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
<br />              <h5 className="fontst">All Users</h5>

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
          <tr key={index}>
            <td>{index + 1}</td>
            <td><StarRating rating={feedback.rating} /></td>
            <td>{feedback.feedbackText}</td>
            <td>{feedback.email} </td>
            <td>
       
 <FontAwesomeIcon
                          icon={faTrash}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleRemoveFeedback(feedback._id)}
                        />             
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
</div>

    </div>
            </div>
          </div>
          <Footer />
          <ToastContainer />
        </div>
      </div>
      </div>
    </>
  );
};

export default AdminDasboard;
