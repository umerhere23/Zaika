import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const ingredientPackSchema = new mongoose.Schema({
  recipeid: {
    type: String,
    required: true,
  },
  ingredients: [ingredientSchema], 
  totalPrice: {
    type: Number,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const IngredientPack = mongoose.model('IngredientPack', ingredientPackSchema);

export default IngredientPack;
