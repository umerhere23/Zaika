import express from 'express';
import { saveShippingData ,getShippingData} from '../../controller/ShippingDataController.js';

const router = express.Router();
router.post('/', saveShippingData); 
router.get('/:Uname',getShippingData);

export default router;
