import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date, 
    required: true,
  },
  end: {
    type: Date, 
    required: true,
  },
  UserName:{
    type: String,
    required: true,
  }
});

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;
