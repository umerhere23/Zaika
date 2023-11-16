import express from 'express';
import { login } from '../controller/LoginController.js';

const router = express.Router();
router.post('/', login); // Changed to match the root of the mounted route

export default router;
