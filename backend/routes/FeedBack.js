// feedbackRoutes.js
import express from 'express';
import { saveFeedback } from '../controller/FeedbackController.js';

const router = express.Router();

router.post("/", saveFeedback);

export default router;
