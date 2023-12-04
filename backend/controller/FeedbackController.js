// FeedbackController.js
import Feedback from '../Models/FeedBacks.js';

export const saveFeedback = async (req, res) => {
  try {
    const { recipeId, rating, feedbackText, email } = req.body;

    if (!recipeId || !rating || !feedbackText || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    

    const newFeedback = new Feedback({
      recipeId,
      rating,
      feedbackText,
      email,
    });

    await newFeedback.save();

    res.status(201).json({ message: 'Feedback saved successfully' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
