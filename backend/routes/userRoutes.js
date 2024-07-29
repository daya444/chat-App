import express from 'express';
import { getUserForSideBar } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';


const router = express.Router();

router.get('/', protectRoute, getUserForSideBar)

export default router