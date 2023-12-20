import express from 'express';
import { saveShippingData } from '../../controller/ShippingDataController.js';

const router = express.Router();
router.post('/', saveShippingData); 
// router.post("/", AdminSignup);

export default router;
