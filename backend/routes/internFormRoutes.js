import express from "express";
const router = express.Router();
import {protect,admin} from '../middleware/authMiddleware.js'
import { createInternForm, getInternFormById, getInternOrders } from "../controllers/internformController.js";

router.route('/').get(protect,admin,getInternOrders);
router.route("/").post(protect,createInternForm);
router.route("/:id").get(protect,getInternFormById);


export default router;