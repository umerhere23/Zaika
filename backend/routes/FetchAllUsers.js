import express from 'express';

import { fetchUserData, blockUser} from '../controller/UserController.js';
const router = express.Router();

router.get('/', fetchUserData); 
router.put('/:_id', blockUser);

export default router;

