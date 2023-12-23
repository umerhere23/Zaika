import express from 'express';
import { saveShippingData ,getShippingData,MarkComplete,DeleteOrder,fetchShippingData} from '../../controller/ShippingDataController.js';

const router = express.Router();
router.post('/', saveShippingData); 
router.get('/:Uname',getShippingData);
router.put('/:_id', MarkComplete);
router.delete('/:_id', DeleteOrder);
router.get('/',fetchShippingData);


export default router;
