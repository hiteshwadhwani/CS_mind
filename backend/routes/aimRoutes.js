import express from "express";
const router = express.Router();
import {protect,academicAdmin} from '../middleware/authMiddleware.js'
import {createAim,getMyAimOrders,getAimOrders,getAimById, updateAimById} from '../controllers/aimController.js';

router.route('/').get(protect,academicAdmin,getAimOrders);
router.route("/myaims").get(protect,getMyAimOrders);
router.route("/").post(protect,createAim);
router.route("/:id").get(protect,getAimById).put(protect,academicAdmin,updateAimById);


export default router;