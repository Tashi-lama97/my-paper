const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const resumeSchema = mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    maxlength: 32,
    required: true,
  },
  lastname: {
    type: String,
    trim: true,
    maxlength: 32,
  },
  contact_details: {
    email: String,
    mobile: String,
  },
  address: {
    line_1: String,
    line_2: String,
    line_3: String,
    city: String,
    state: String,
  },
  profession: {
    type: String,
    trim: true,
    required: true,
  },
  discription: {
    type: String,
    trim: true,
  },
  academic_qualification: [
    {
      qualification_title: String,
      institute: String,
      board: String,
      passing_year: String,
    },
  ],
  certificates_diplomas: [
    {
      diploma_title: String,
      diploma_institute: String,
      course_duration: String,
      date_of_completion: String,
    },
  ],
  skills: [
    {
      skill: String,
      skill_level: String,
    },
  ],
  fresher: {
    type: Boolean,
    default: false,
  },
  experience: [
    {
      organisation: String,
      position: String,
      work_details: [],
      joining_month: String,
      joining_year: String,
      leaving_month: String,
      leaving_year: String,
    },
  ],
  resumeTemplate: {
    required: true,
    type: Number,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Resume", resumeSchema);
