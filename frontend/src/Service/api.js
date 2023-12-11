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
