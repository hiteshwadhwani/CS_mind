import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  forgotPasswordMail,
  updateUserPassword, deleteUser, getUserById, updateUser, getUsers, getCalligraphers, getReaders, checkGoogleId
} from "../controllers/userController.js";
import { protect, admin ,commitmentAdmin} from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);
//router.route('/checkmail/:mail').get(checkGoogleId);
router.route("/profile").put(protect, updateUserProfile);
router.route("/resetmail").post(forgotPasswordMail);
router.route('/calligraphers').get(protect,commitmentAdmin,getCalligraphers);
router.route('/readers').get(protect,commitmentAdmin,getReaders);
router.route("/resetpassword").put(updateUserPassword);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

router.route("/").get(protect, admin, getUsers);
export default router;
