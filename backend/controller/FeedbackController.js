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
export const fetchfeedback = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const feedbacks = await Feedback.find({ recipeId });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch feedback.' });
  }
};
