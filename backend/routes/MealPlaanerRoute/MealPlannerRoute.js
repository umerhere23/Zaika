import express from 'express';
const router = express.Router();
import { saveMealPlan,getMealPlans,removeMeal } from '../../controller/MealPlanner.js';

router.post('/',saveMealPlan);
router.get('/:userName',getMealPlans);
router.delete('/:mealToDeleteId',removeMeal);

export default router;
