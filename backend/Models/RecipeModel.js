import mongoose from 'mongoose';

const RecipeModelStructure = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
  timeToCook: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});

const RecipeModel = mongoose.model('Recipes', RecipeModelStructure);

export default RecipeModel;
