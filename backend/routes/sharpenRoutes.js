import express from "express";
const router = express.Router();
import {protect,trainerAdmin} from '../middleware/authMiddleware.js'
import {createSharpen,getMySharpenOrders,getSharpenById,updateSharpenById,getSharpenOrders} from '../controllers/sharpenController.js';

router.route('/').get(protect,trainerAdmin,getSharpenOrders);
router.route("/mysharpens").get(protect,getMySharpenOrders);
router.route("/").post(protect,createSharpen);
router.route("/:id").get(protect,getSharpenById).put(protect,trainerAdmin,updateSharpenById);


export default router;