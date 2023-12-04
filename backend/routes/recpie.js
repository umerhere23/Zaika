import express from 'express';
import { AddRecipe, getRecipes, getRecipesByUsername } from '../controller/RecipeController.js';

const router = express.Router();

router.post("/", AddRecipe);

router.get("/", getRecipes);

router.get("/:userName", getRecipesByUsername);

export default router;
