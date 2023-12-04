// ./routes/UserDetails.js
import express from 'express';
import { getUserDetails } from '../controller/UserController.js';
import { updateUserDetails } from '../controller/UserController.js';

const router = express.Router();

router.get('/', getUserDetails); // Assuming getUserDetails fetches user data based on an email query parameter
router.put('/:userId', updateUserDetails);

export default router;

