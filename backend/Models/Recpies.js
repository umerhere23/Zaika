import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: false,
  },
});

const Recipe = mongoose.model('Recipeees', recipeSchema);

export default Recipe;
