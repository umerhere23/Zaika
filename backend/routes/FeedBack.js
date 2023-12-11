// feedbackRoutes.js
import express from 'express';
import { saveFeedback,fetchAllFeedbacks } from '../controller/FeedbackController.js';

const router = express.Router();

router.post("/", saveFeedback);
router.get("/", fetchAllFeedbacks);
export default router;
