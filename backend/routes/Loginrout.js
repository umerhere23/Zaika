
import express from 'express';
import {  loginApplication } from '../controller/LoginController.js';

const router = express.Router();


router.get("/", loginApplication);


export default router;
