import axios from 'axios';

const baseUrl = "http://localhost:5000";
export const addApplicant = async (applicantData) => {
  try {
      const response = await axios.post(`${baseUrl}/hostelApplicants`, applicantData);
      return response.data; // Return the response data
  } catch (error) {
      throw error; // Throw the error for handling in the calling code
  }
}

export const getApplicant = async () => {
    try {
        const response = await axios.get(`${baseUrl}/viewApplicants`);
        return response.data; // Return the response data
    } catch (error) {
        throw error; // Throw the error for handling in the calling code
    }
}


export const onAddRecipe = async (recipedata) => {
    try {
        const response = await axios.post(`${baseUrl}/AddRecipe`, recipedata);
        // Handle the successful response here
        console.log('Recipe added successfully', response.data);
      } catch (error) {
        // Handle Axios error here
        if (error.response) {
          // The request was made, but the server responded with an error status code
          console.error('Server returned an error:', error.response.data);
        } else if (error.request) {
          // The request was made, but no response was received
          console.error('No response received from the server');
        } else {
          // Something else happened while setting up the request
          console.error('Error sending the request:', error.message);
        }
      }
}

export const fetchRecipes = async () => {
    try {
        const response = await axios.get(`${baseUrl}/recipes`);
        return response.data;
    } catch (error) {
        throw error; // Throw the error for handling in the calling code
    }
}
// export const loginApi = async (loginData) => {
//   try {
//     const response = await axios.post(`${baseUrl}/loginroute`, loginData);
// return response.data; // Return the response data
//   } catch (error) {
//       throw error; // Throw the error for handling in the calling code
//   }
// }
export const loginApi = async (loginData) => {
  try {
    const response = await axios.post(`${baseUrl}/Loginroute`, loginData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Handle response error from server
      throw error.response.data;
    } else {
      // Handle other errors
      throw new Error('An error occurred during the login request');
    }
  }
};
export const fetchUserDetails = async (email) => {
  try {
    const response = await axios.get(`${baseUrl}/UserData`, { params: { email } });
    console.log("Succesful")
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};