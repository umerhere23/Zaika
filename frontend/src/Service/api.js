import axios from 'axios';

const baseUrl = "http://localhost:5000";
export const addApplicant = async (applicantData) => {
  try {
    const response = await axios.post(`${baseUrl}/hostelApplicants`, applicantData);
    return response;
  } catch (error) {
    throw error;
  }
};


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



export const sendMealsToBackend = async (meals) => {
  try {
    const response = await axios.post(`${baseUrl}/meals`, meals);
    console.log('Meals:', meals);
    console.log('Meals saved:', response.data);
  } catch (error) {
    console.error('Error saving meals:', error);
  }
};
export const fetchMealsFromBackend = async (userName) => {
  try {
    const response = await axios.get(`${baseUrl}/meals/${userName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching meals:', error);
    throw error;
  }
};
export const deleteMealFromBackend = async (mealToDeleteId) => {
  try {
    const response = await axios.delete(`${baseUrl}/meals/${mealToDeleteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const addIngredientPack = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/AddIngredients`, formData);
    console.log('Meals:', formData);
    console.log('formData saved:', response.data);
  } catch (error) {
    console.error('Error saving formData:', error);
  }
};

export const AddIngredients = async () => {
  try {
    const response = await axios.get(`${baseUrl}/AddIngredients`);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Error fetching Ingredients: ${response.status}`);
    }
  } catch (error) {
    console.error('Error in Ingredients:', error);
    throw error;
  }
};


export const createUpperAPI = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/image`, formData);
    console.log('Data sent:', formData);
    console.log('Response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending data:', error);
    throw new Error('Error sending data to Upper API');
  }
};
export const Saveshippingdata = async (formFields) => {
  try {
    const response = await axios.post(`${baseUrl}/saveshippingdata`, formFields);

    return response.data;
  } catch (error) {
    console.error('Error saving feedbackData:', error);
    throw error;
  }
};
export const fetchorder = async (Uname) => {
  try {
    const response = await axios.get(`${baseUrl}/saveshippingdata/${Uname}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};


export const markOrderAsComplete = async ({ _id, action }) => {
  try {
    const Completed = action === true;
    await axios.put(`${baseUrl}/complete/${_id}`, { Completed });
    return Completed;
  } catch (error) {
    throw error;
  }
};
export const DeleteOrder = async (_id) => {
  try {
    const response = await axios.delete(`${baseUrl}/complete/${_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const deleteIngredient = async (ingredientId) => {
  try {
    const response = await axios.delete(`${baseUrl}/Delete/${ingredientId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllorder = async () => {
  try {
    const response = await axios.get(`${baseUrl}/saveshippingdata`);

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

export const updateIngredientQuantity = async (id, updatedQuantity) => {
  try {
    const response = await axios.put(`${baseUrl}/ingredients/${id}`, { updatedQuantity });

    console.log(response.data.message); 
  } catch (error) {
    console.error('Error updating ingredient quantity:', error);
  }
};

export const fetchrecpie = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/FetchRecpie/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Recpie:', error);
    throw error;
  }
};