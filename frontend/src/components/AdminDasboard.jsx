import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { CRow, CCol, CWidgetStatsB } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBan, faCheckCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import { fetchAllUsers, blockUser, deleteUser, unblockUser, removeRecipe, fetchRecipes } from '../Service/api';
import Footer from './footer';
import '../components/CSS/AdminDasboard.css';
import { fetchAllFeedbacks,removefeedback } from '../Service/api';
import StarRating from '../components/icons/stars.jsx'; 
import { Table } from 'react-bootstrap';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';

const AdminDasboard = () => {
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedTable, setSelectedTable] = useState('users');

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
  const renderSelectedTable = () => {
    switch (selectedTable) {
      case 'users':
        return renderUsersTable();
      case 'recipes':
        return renderRecipesTable();
      case 'feedback':
        return renderFeedbackTable();
      default:
        return null;
    }
  };

const renderUsersTable = () => {
  return (
    <>
    <br />
      <div className="tables" >

        <table className="table" id='recps'>

          <thead>
          <th scope="col"colSpan={10} style={{ textAlign: "center" }} className='txt2'>
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
       

      </div>
    </>
  );
};

const renderRecipesTable = () => {
  return (
    <>
   

      <div className="row " >

              <table className="table " id='recps'>
                <thead>
                <th scope="col"colSpan={10} style={{ textAlign: "center" }} className='txt2'>
                  <h4>Recpies</h4>
                </th>
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
              </table>      </div>

    </>
  );
};

const renderFeedbackTable = () => {
  return (
    <>
      <div className="row fdb"  >
        <div className="container py-5 " >
          <Table striped bordered hover responsive className="table">
            <thead className="thead-dark">
              <tr>
                <th colSpan={6} style={{ textAlign: "center" }} className='txt2'>
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
    </>
  );
};

return (
  <>
 

 <CDBSidebar className='CDBSidebar' style={{ background: "#001827", height: '100vh' }}>
    <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Admin Dasbaord</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem onClick={() => setSelectedTable('users')} icon="th-large">Users</CDBSidebarMenuItem>
            <CDBSidebarMenuItem onClick={() => setSelectedTable('recipes')} icon="sticky-note">Recipes</CDBSidebarMenuItem>
            <CDBSidebarMenuItem onClick={() => setSelectedTable('feedback')} icon="star" iconType="solid">

              Feedback
            </CDBSidebarMenuItem>
      

          </CDBSidebarMenu>
        </CDBSidebarContent>
<hr />
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }}>
          <p>&copy; {new Date().getFullYear()} Zaika(The Recipie)</p>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>

      <div style={{  padding: '20px' }} className='AdminContent'>
        {selectedTable === 'users' && renderUsersTable()}
        {selectedTable === 'recipes' && renderRecipesTable()}
        {selectedTable === 'feedback' && renderFeedbackTable()}
      </div>

      <ToastContainer />
    </>
);
};
export default AdminDasboard;
