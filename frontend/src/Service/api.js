import axios from 'axios';

const baseUrl = "http://localhost:5000";
export const addApplicant = async (applicantData) => {
  try {
      const response = await axios.post(`${baseUrl}/hostelApplicants`, applicantData);
      return response.data; 
  } catch (error) {
      throw error; 
  }
}

export const getApplicant = async () => {
    try {
        const response = await axios.get(`${baseUrl}/viewApplicants`);
        return response.data; 
    } catch (error) {
        throw error; 
    }
}


export const onAddRecipe = async (recipedata) => {
    try {
        const response = await axios.post(`${baseUrl}/AddRecipe`, recipedata);
        console.log('Recipe added successfully', response.data);
      } catch (error) {
        if (error.response) {
          console.error('Server returned an error:', error.response.data);
        } else if (error.request) {
          console.error('No response received from the server');
        } else {
          console.error('Error sending the request:', error.message);
        }
      }
}

export const fetchRecipes = async () => {
    try {
        const response = await axios.get(`${baseUrl}/recipes`);
        return response.data;
    } catch (error) {
        throw error; 
    }
}

export const loginApi = async (loginData) => {
  try {
    const response = await axios.post(`${baseUrl}/Loginroute`, loginData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error('An error occurred during the login request');
    }
  }
};

export const fetchUserDetails = async (email) => {
  try {
    const response = await axios.get(`${baseUrl}/UserData`, {
      params: { email }
    });
    console.log("Successful");
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    console.log("unSuccessful");
    throw error;
  }
};

export const updateUserDetails = async (userId, userData) => {
  try {
      const response = await axios.put(`${baseUrl}/updateUser/${userId}`, userData);
      console.log('User details updated successfully', response.data);
      return response.data; 
  } catch (error) {
   
if (error.response) {
  console.error('Server returned an error:', error.response.data);
  throw error.response.data;  
} else if (error.request) {
  console.error('No response received from the server');
} else {
  console.error('Error sending the request:', error.message);
}

      throw error; 
  }
};

export const fetchUserRecipes = async (userName) => {
  try {
    const response = await axios.get(`${baseUrl}/fetchUserRecipes/${userName}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const fetchRecipeById = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/recipes/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching recipe by ID: ${response.status}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error in fetchRecipeById:', error);
    throw error;
  }
};
export const saveFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(`${baseUrl}/saveFeedback`, feedbackData);

    return response.data;
  } catch (error) {
    console.error('Error saving feedback:', error);
    throw error;
  }
};




export const fetchAllFeedbacks = async () => {
  try {
    const response = await axios.get(`${baseUrl}/fetchfeedbacks`);
    
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Error fetching all feedbacks: ${response.status}`);
    }
  } catch (error) {
    console.error('Error in fetchAllFeedbacks:', error);
    throw error;
  }
};
export const removeRecipe = async (name) => {
  try {
    const response = await axios.delete(`${baseUrl}/removeRecipe/${name}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removefeedback = async (_id) => {
  try {
    const response = await axios.delete(`${baseUrl}/removefeedback/${_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const AdminloginApi = async (loginData) => {
  try {
    const response = await axios.post(`${baseUrl}/Adminlogin`, loginData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error('An error occurred during the login request');
    }
  }
};

export const addAdmin = async (applicantData) => {
  try {
      const response = await axios.post(`${baseUrl}/AdminSignup`, applicantData);
      return response.data; 
  } catch (error) {
      throw error; 
  }
}

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/fetchUsers`);
    
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Error fetching all Users: ${response.status}`);
    }
  } catch (error) {
    console.error('Error in fetchAllUsers:', error);
    throw error;
  }
};

export const deleteUser = async (_id) => {
  try {
    const response = await axios.delete(`${baseUrl}/removeaccount/${_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const blockUser = async ({ _id, action }) => {
  try {
    const isBlocked = action === true; 
    await axios.put(`${baseUrl}/blockUser/${_id}`, { isBlocked });
    return isBlocked;
  } catch (error) {
    throw error;
  }
};
export const unblockUser = async (_id) => {
  try {
    await axios.put(`${baseUrl}/blockUser/${_id}`, { isBlocked: false });
  } catch (error) {
    throw error;
  }
};


export const addMealPlan = async (mealPlanData) => {
  try {
    const response = await axios.post(`${baseUrl}/meal-planner`, mealPlanData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getMealSuggestions = async (userPreferences) => {
  try {
    const response = await axios.post(`${baseUrl}/meal-suggestions`, userPreferences);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const sendMealsToBackend = async (meals) => {
  try {
    const response = await axios.post(`${baseUrl}/meals`, { meals });

    console.log('Meals saved:', response.data);
    alert('Meals saved successfully');
  } catch (error) {
    console.error('Error saving meals:', error);
    alert('Error saving meals');
  }
};