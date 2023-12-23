import express from 'express';
import { adminLogin } from '../controller/AdminController.js';
const router = express.Router();
router.post('/', adminLogin); 
// router.post("/", AdminSignup);

export default router;
