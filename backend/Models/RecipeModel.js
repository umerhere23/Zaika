import mongoose from 'mongoose';

const RecipeModelStructure = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  ingredients: {
    type: String,
    required: false,
  },
  instructions: {
    type: String,
    required: false,
  },
  image: {
    type: String, 
    required: false,
  },
  timeToCook: {
    type: Number,
    required: false,
  },
  userName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  }
  
});

const RecipeModel = mongoose.model('Recipes', RecipeModelStructure);

export default RecipeModel;
