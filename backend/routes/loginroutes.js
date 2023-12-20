
import express from 'express';
import { getApplications, createApplication, loginApplication1 } from '../controller/logoncontroller.js';

const router = express.Router();

router.get("/", getApplications);
router.post("/", createApplication);
router.post("/", loginApplication1);


export default router;