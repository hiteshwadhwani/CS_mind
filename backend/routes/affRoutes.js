import express from "express";
const router = express.Router();
import {protect,admin} from '../middleware/authMiddleware.js'
import {createAff, deleteAff, getAffs, getMyAff, updateAffId} from '../controllers/affController.js';
router.route('/').get(getAffs);
router.route("/").post(protect,admin,createAff);
router.route("/:id").get(protect,admin,getMyAff).delete(protect,admin,deleteAff).put(protect,admin,updateAffId);


export default router;