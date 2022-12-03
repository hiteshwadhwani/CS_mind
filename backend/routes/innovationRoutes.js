import express from "express";
const router = express.Router();
import {protect,techAdmin} from '../middleware/authMiddleware.js'
import {getInnovationId,getInnovationOrders,getMyInnovationOrders,createInnovation, updateInnovationById} from '../controllers/innovationController.js';

router.route('/').get(protect,techAdmin,getInnovationOrders);
router.route("/myinnovations").get(protect,getMyInnovationOrders);
router.route("/").post(protect,createInnovation);
router.route("/:id").get(protect,getInnovationId).put(protect,techAdmin,updateInnovationById);


export default router;