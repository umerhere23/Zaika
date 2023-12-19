import express from 'express';
import { addIngredientPack,AllIngredients } from '../controller/IngredientsController.js';

const router = express.Router();
router.post('/', addIngredientPack); 
router.get('/', AllIngredients); 

export default router;
