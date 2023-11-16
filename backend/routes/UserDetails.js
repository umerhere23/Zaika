// Assuming this is in a file like routes/userRoutes.js
import express from 'express';
import { getUserDetails } from '../controller/UserController.js';

const router = express.Router();

router.get('/user', getUserDetails);

export default router;
