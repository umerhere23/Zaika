import express from 'express';
import { login } from '../controller/LoginController.js';

const router = express.Router();
router.post('/', login); 

export default router;
