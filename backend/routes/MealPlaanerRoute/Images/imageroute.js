import express from 'express';
const router = express.Router();
import { handleImageUpload } from '../../../controller/image.js'; // Adjust the import path based on your folder structure

router.post('/', handleImageUpload);

export default router;
