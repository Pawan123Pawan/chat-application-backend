import express from 'express';
import { sendMessageController,getMessageController } from '../controllers/messageController.js';
import { isAuthenticated } from '../meddilewares/isAuth.js';

const router = express.Router();

router.post("/send/:id",isAuthenticated, sendMessageController);
router.get("/:id",isAuthenticated, getMessageController);


export default router;