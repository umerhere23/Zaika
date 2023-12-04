
import RecipeModel from '../Models/RecipeModel.js';

export const AddRecipe = async (req, res) => {
  const {
    name,
    ingredients,
    instructions,
    image,
    timeToCook,
    userName,
    email,
  } = req.body;
  const imageString = image.toString('base64');

  const newRecipe = new RecipeModel({
    name: name,
    ingredients: ingredients,
    instructions: instructions,
    image: imageString,
    timeToCook: timeToCook,
    userName: userName,
    email: email,
  });

  try {
    await newRecipe.save();
    res.status(201).json(newRecipe); 
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to create recipe." });
  }
};
export const getRecipes = async (req, res) => {
    try {
      const recipes = await RecipeModel.find();
  
      res.status(200).json(recipes);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Failed to fetch recipes." });
    }
  };

  export const getRecipesByUsername = async (req, res) => {
    const { userName } = req.params;
  
    try {
      const recipes = await RecipeModel.find({ userName: userName });
      res.status(200).json(recipes);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to fetch recipes.' });
    }
  };
  