import express from 'express';
const router = express.Router();
import {protect,commitmentAdmin,cal,reader} from '../middleware/authMiddleware.js'
import {getCommitmentById,addCommitment,getCommitments,getMyCommitments,updateCommitmentlToComplete, updateCommitmentCal, updateCommitmentReader, getCalCommitments, getReaderCommitments, updateCalUploads, updateReaderUploads, addComment} from '../controllers/commitmentController.js'


router.route('/').get(protect,commitmentAdmin,getCommitments);
router.route("/mycommitments").get(protect,getMyCommitments);
router.route("/").post(protect,addCommitment);
router.route('/cal/assign').put(protect,commitmentAdmin,updateCommitmentCal)
router.route('/cal/upload').put(protect,cal,updateCalUploads)
router.route('/reader/assign').put(protect,commitmentAdmin,updateCommitmentReader)
router.route('/reader/select').put(protect,reader,updateReaderUploads)
router.route('/comment').post(protect,addComment);
router.route('/cal/:id').get(protect,cal,getCalCommitments)
router.route('/reader/:id').get(protect,reader,getReaderCommitments)
router.route("/:id").get(protect,getCommitmentById).put(protect,commitmentAdmin,updateCommitmentlToComplete);

export default router;