// ./routes/UserDetails.js
import express from 'express';
import { getUserDetails } from '../controller/UserController.js';
import { updateUserDetails } from '../controller/UserController.js';

const router = express.Router();

router.get('/', getUserDetails); 
router.put('/:userId', updateUserDetails);

export default router;

