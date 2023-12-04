// FeedbackModel.js
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  feedbackText: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
