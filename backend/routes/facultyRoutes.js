import express from "express";
const router = express.Router();
import {protect,admin} from '../middleware/authMiddleware.js'
import { getFaculties ,createFaculty, getMyFaculty, deleteFaculty, updateFacultyId} from '../controllers/facultyController.js';

router.route('/').get(getFaculties);
router.route("/").post(protect,admin,createFaculty);
router.route("/:id").get(protect,admin,getMyFaculty).delete(protect,admin,deleteFaculty).put(protect,admin,updateFacultyId);


export default router;