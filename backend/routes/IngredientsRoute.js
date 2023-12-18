import express from 'express';
import { addIngredientPack } from '../controller/IngredientsController.js';

const router = express.Router();
router.post('/', addIngredientPack); 

export default router;
