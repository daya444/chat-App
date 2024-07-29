import express from 'express';
import { getMessage, sendmessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';



let  router = express.Router();


router.post("/send/:id",protectRoute,sendmessage)
router.get("/:id",protectRoute,getMessage)

export default router