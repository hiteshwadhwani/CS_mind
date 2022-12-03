import express from "express";
const router = express.Router();
import {protect,admin} from '../middleware/authMiddleware.js'
import { getInterns,createIntern,getMyIntern,deleteIntern ,updateInternId} from '../controllers/internController.js';

router.route('/').get(getInterns);
router.route("/").post(protect,admin,createIntern);
router.route("/:id").get(protect,admin,getMyIntern).delete(protect,admin,deleteIntern).put(protect,admin,updateInternId);


export default router;