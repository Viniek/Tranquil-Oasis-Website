import { Router } from 'express';
import { validateInformation } from '../middleware/users.middleware.js';
import { createUser, loginUser } from '../controllers/users.controllers.js';

const router = Router();

router.post("/register", validateInformation, createUser);
router.post("/login", loginUser);

export default router;
