import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import loginApplication from './routes/loginroutes.js'; 
import recipeRoutes from './routes/recpie.js'; 
import Loginroute from './routes/Loginrout.js';
import UserData from './routes/UserDetails.js';
import Feedback from './routes/FeedBack.js';
import Adminlogin from './routes/adminRoute.js';
import fetchUserData from './routes/FetchAllUsers.js';
import mealRoutes from "./routes/MealPlaanerRoute/MealPlannerRoute.js"
import addIngredient from './routes/IngredientsRoute.js';
import  Saveshippingdata  from './routes/MealPlaanerRoute/Shippingdataroute.js';

const app = express(); 

const connectionURL = "mongodb://127.0.0.1:27017/Zaika"; 

const port = process.env.PORT || 5000;

mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected to MongoDB`);
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    })
    .catch((error) => console.error(`MongoDB connection error: ${error.message}`));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/hostelApplicants', loginApplication);
app.use('/viewApplicants', loginApplication);
app.use('/loginApplicants1', loginApplication);
app.use('/AddRecipe', recipeRoutes);
app.use('/recipes', recipeRoutes); 
app.use('/Loginroute', Loginroute);
app.use('/UserData', UserData);
app.use('/updateUser', UserData);
app.use('/fetchUserRecipes', recipeRoutes);
app.use('/saveFeedback',Feedback)
app.use('/fetchfeedbacks',Feedback)
app.use('/removeRecipe',recipeRoutes)
app.use('/removefeedback',Feedback)
app.use('/Adminlogin',Adminlogin)
app.use('/fetchUsers',fetchUserData)
app.use('/removeaccount', UserData);
app.use('/blockUser', fetchUserData);
app.use('/blockUser', fetchUserData);
app.use('/meals', mealRoutes);
app.use('/AddIngredients', addIngredient);
app.use('/Delete', addIngredient);
app.use('/saveshippingdata', Saveshippingdata);
app.use('/complete', Saveshippingdata);
app.use('/ingredients', addIngredient);
