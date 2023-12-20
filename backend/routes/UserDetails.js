import express from 'express';
import { getUserDetails } from '../controller/UserController.js';
import { updateUserDetails } from '../controller/UserController.js';
import { fetchUserData,removeUser } from '../controller/UserController.js';

const router = express.Router();

router.get('/', getUserDetails); 
router.put('/:userId', updateUserDetails);
router.get('/', fetchUserData); 
router.delete('/:_id', removeUser);  

export default router;

