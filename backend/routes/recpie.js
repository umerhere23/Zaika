import express from 'express';
import { AddRecipe,getRecipes } from '../controller/RecipeController.js';

const router = express.Router();

router.post("/", AddRecipe);
router.get("/", getRecipes);

export default router;
