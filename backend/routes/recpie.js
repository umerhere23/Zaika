import express from 'express';
import { addRecipe, getRecipes, getRecipesByUsername } from '../controller/RecipeController.js';

const router = express.Router();

router.post("/", addRecipe);

router.get("/", getRecipes);

router.get("/:userName", getRecipesByUsername);

export default router;
