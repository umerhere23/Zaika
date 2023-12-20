import express from 'express';
import { saveFeedback,fetchAllFeedbacks,removeFeedback } from '../controller/FeedbackController.js';

const router = express.Router();

router.post("/", saveFeedback);
router.get("/", fetchAllFeedbacks);
router.delete('/:_id', removeFeedback);  

export default router;
