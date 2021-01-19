const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  isAuthenticated,
  isLogedIn,
  isAdmin,
  isVerified,
} = require("../controllers/auth");
const {
  addResume,
  getAllResumes,
  getResumeById,
  getResume,
  getResumeByUserId,
  deleteResume,
  updateResume,
} = require("../controllers/resume");
const { getUserById } = require("../controllers/user");

//Params

router.param("userId", getUserById);
router.param("resumeId", getResumeById);

//Add Resume Route
router.post(
  "/resume/add/:userId",
  isLogedIn,
  isAuthenticated,
  isVerified,
  addResume
);

//Get All Resume Lists
router.get(
  "/resumes/list/:userId",
  isLogedIn,
  isAuthenticated,
  isVerified,
  isAdmin,
  getAllResumes
);

//Get Single Resume
router.get(
  "/user/resume/:userId/:resumeId",
  isLogedIn,
  isAuthenticated,
  isVerified,
  getResume
);

//Get resume by User
router.get(
  "/user/resumes/:userId",
  isLogedIn,
  isAuthenticated,
  isVerified,
  getResumeByUserId
);

//delete resume
router.delete(
  "/resume/delete/:userId/:resumeId",
  isLogedIn,
  isAuthenticated,
  isVerified,
  deleteResume
);

//Update
router.put(
  "/resume/update/:userId/:resumeId",
  isLogedIn,
  isAuthenticated,
  isVerified,
  updateResume
);

module.exports = router;
