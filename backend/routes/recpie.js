import express from 'express';
import { AddRecipe, getRecipes, getRecipesByUsername,removeRecipe } from '../controller/RecipeController.js';

const router = express.Router();

router.post("/", AddRecipe);

router.get("/", getRecipes);

router.get("/:userName", getRecipesByUsername);
router.delete('/:recipeId', removeRecipe);

export default router;
