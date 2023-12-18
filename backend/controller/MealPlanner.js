import Meal from '../Models/mealModel.js';


import moment from 'moment';

export const saveMealPlan = async (req, res) => {
  const mealDataArray = req.body;
  console.log('Received meal data:', mealDataArray);

  try {
    const savedMeals = [];

    for (const mealData of mealDataArray) {
      const formattedStart = moment(mealData.start).format('YYYY-MM-DD HH:mm:ss');
      const formattedEnd = moment(mealData.end).format('YYYY-MM-DD HH:mm:ss');

      const meal = new Meal({
        title: mealData.title,
        start: formattedStart,
        end: formattedEnd,
        UserName: mealData.Username
      });

      await meal.save();
      savedMeals.push(meal);
    }

    res.status(201).json({ message: 'Meal plan saved successfully', meals: savedMeals });
  } catch (error) {
    console.error('Error saving meal plan:', error);
    res.status(500).json({ error: 'Failed to save meal plan. Please try again later.' });
  }
};



export const getMealPlans = async (req, res) => {
  try {
    const { userName } = req.params;
    const meals = await Meal.find({ UserName: userName });
    res.json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ error: 'Failed to fetch meals. Please try again later.' });
  }
};
export const removeMeal = async (req, res) => {
  const { mealToDeleteId } = req.params;

  try {
    const deleteMeal = await Meal.findByIdAndDelete(mealToDeleteId);

    if (!deleteMeal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    res.json({ message: 'Meal deleted successfully' });
  } catch (error) {
    console.error('Error deleting Meal:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};