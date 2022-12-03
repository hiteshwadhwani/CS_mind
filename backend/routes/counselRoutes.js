import express from 'express'
const router = express.Router();
import {protect,counselAdmin} from '../middleware/authMiddleware.js'
import {addCounsel,getCounselById,getCounsels,getMyCounsels,updateCounselToComplete} from '../controllers/counselController.js'

router.route('/').get(protect,counselAdmin,getCounsels).post(protect,addCounsel)
router.route('/mycounsels').get(protect,getMyCounsels)
router.route('/:id').put(protect,counselAdmin,updateCounselToComplete).get(protect,getCounselById)



export default router;