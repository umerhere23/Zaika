// feedbackRoutes.js
import express from 'express';
import { saveFeedback,fetchfeedback } from '../controller/FeedbackController.js';

const router = express.Router();

router.post("/", saveFeedback);
router.get("/:id", fetchfeedback);

export default router;
