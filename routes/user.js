const express = require("express");
const router = express.Router();
const {
  isLogedIn,
  isAuthenticated,
  isVerified,
  isAdmin,
} = require("../controllers/auth");

const {
  updateUser,
  getUserById,
  verifyEmail,
  resetPassword,
  getForgotPasswordLink,
  validateResetToken,
  sendContactUs,
  getAllUsersList,
} = require("../controllers/user");

//Params
router.param("userId", getUserById);

//GET ALL USER FOR ADMIN
router.get(
  "/users/list/:userId",
  isLogedIn,
  isAuthenticated,
  isVerified,
  isAdmin,
  getAllUsersList
);

//USER VERIFICATION
router.post("/user/verifyemail", verifyEmail);

//FORGOT PASSWORD
router.post("/user/getForgotPasswordLink", getForgotPasswordLink);

router.post("/user/verifytoken", validateResetToken);

router.put("/user/resetpassword", resetPassword);

//CONTACT US EMAIL

router.post("/contact", sendContactUs);

//UPDATE USER
router.put(
  "/user/update/:userId",
  isLogedIn,
  isAuthenticated,
  isVerified,
  updateUser
);

module.exports = router;
