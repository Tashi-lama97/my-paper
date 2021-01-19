const { isValidObjectId } = require("mongoose");
const Resume = require("../models/resume");

//params
exports.getResumeById = (req, res, next, id) => {
  Resume.findById(id)
    .populate("user", "_id name")
    .exec((err, resume) => {
      if (err || !resume) {
        return res.status(404).json({
          error: "something went wrong",
        });
      }
      req.resumeInfo = resume;
      next();
    });
};

//get single resume
exports.getResume = (req, res) => {
  res.status(200).json(req.resumeInfo);
};

//Add Resume
exports.addResume = (req, res) => {
  const resume = new Resume(req.body);
  resume.save((err, resume) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json({
      resumeId: resume._id,
    });
  });
};

//Get Resume by user Id
exports.getResumeByUserId = (req, res) => {
  Resume.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, resumes) => {
      if (err || !resumes) {
        return res.status(404).json({
          error: "Resumes not Found with this id",
        });
      }
      res.status(200).json(resumes);
    });
};
//Get All Resume
exports.getAllResumes = (req, res) => {
  // let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  // let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Resume.find()
    .populate("user", "_id name ")
    .exec((err, resumes) => {
      if (err) {
        return res.status(404).json({
          error: err,
        });
      }
      res.json(resumes);
    });
};

//Delete Resume
exports.deleteResume = (req, res) => {
  const resume = req.resumeInfo;
  resume.remove((err, deleteResume) => {
    if (err) {
      return res.status(400).json({
        error: "Error Deleting Resume",
      });
    }
    res.json({
      message: "Resume Deleted Successfully",
      deleteResume,
    });
  });
};

//Update Resume
exports.updateResume = (req, res) => {
  Resume.findByIdAndUpdate(
    {
      _id: req.resumeInfo._id,
    },
    {
      $set: req.body,
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err, resume) => {
      if (err || !resume) {
        return res.status(400).json({
          error: "Unable to find Resume",
        });
      }
      res.json({
        massege: "Successfully Updated",
        resumeId: resume._id,
      });
    }
  );
};
