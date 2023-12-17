import express from 'express';
const router = express.Router();
import { saveMealPlan,getMealPlans } from '../../controller/MealPlanner.js';

router.post('/',saveMealPlan);
router.get('/',getMealPlans);

export default router;
