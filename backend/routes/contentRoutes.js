import express from "express";
const router = express.Router();
import {protect,admin} from '../middleware/authMiddleware.js'
import { getContent,updateContent} from '../controllers/contentController.js';

router.route('/').get(getContent).put(protect,admin,updateContent)




export default router;