import Meal from '../Models/mealModel.js';

export const saveMealPlan = async (req, res) => {
  const mealData = req.body;

  try {
    const meal = new Meal(mealData);
    await meal.save();
    res.status(201).json({ message: 'Meal plan saved successfully', meal });
  } catch (error) {
    console.error('Error saving meal plan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMealPlans = async (req, res) => {
  try {
    const mealPlans = await Meal.find();
    res.json(mealPlans);
  } catch (error) {
    console.error('Error fetching meal plans:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
