// this file includes all routes related to /api/users

const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser); //  "/" represents /api/users endpoint
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
