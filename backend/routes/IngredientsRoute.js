import express from 'express';
import { addIngredientPack,AllIngredients,removeIng,updateIngredientQuantity } from '../controller/IngredientsController.js';

const router = express.Router();
router.post('/', addIngredientPack); 
router.get('/', AllIngredients); 
router.delete('/:_id', removeIng);  
router.put('/:id', updateIngredientQuantity);

export default router;
