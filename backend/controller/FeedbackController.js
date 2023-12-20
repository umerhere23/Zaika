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


export const fetchAllFeedbacks = async (req, res) => {
  try {
    const allFeedbacks = await Feedback.find();

    res.status(200).json(allFeedbacks);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch feedback." });}}


    export const removeFeedback = async (req, res) => {
      const { _id } = req.params;
    
      try {
        const deletedFeedback = await Feedback.findByIdAndDelete(_id);
    
        if (!deletedFeedback) {
          return res.status(404).json({ message: 'Feedback not found' });
        }
    
        res.json({ message: 'Feedback deleted successfully' });
      } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    };