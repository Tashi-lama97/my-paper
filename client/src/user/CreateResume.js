import React, { Fragment, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import BaseWrapper from "../core/BaseWrapper";
import M from "materialize-css";
import "./css/createResume.css";
import { isAutheticated } from "../auth/helper";
import { saveResumeInfo } from "./helper/userAPICalls";
import PDFpreviewModal from "../core/PDFpreviewModal";

const CreateResume = () => {
  const { templateId } = useParams();
  const { user, token } = isAutheticated();

  //MAIN RESUME DATA SET STATE
  const [resume, setResume] = useState({
    firstname: "",
    lastname: "",
    contact_details: {
      email: "",
      mobile: "",
    },
    address: {
      line_1: "",
      line_2: "",
      line_3: "",
      city: "",
      state: "",
    },
    profession: "",
    discription: "",
    academic_qualification: [],
    experience: [],
    fresher: false,
    certificates_diplomas: [],
    skills: [],
    date: new Date(Date.now()).toISOString(),
    resumeTemplate: parseInt(templateId),
    user: user.id,
  });

  //DESTRUCTURING RESUME DATA
  const {
    firstname,
    lastname,
    contact_details,
    address,
    profession,
    discription,
    academic_qualification,
    experience,
    fresher,
    certificates_diplomas,
    skills,
  } = resume;

  //ON SAVE RESPONSE MANAGEMENT STATE
  const [indicators, setIndicators] = useState({
    loading: "",
    error: "",
    success: "",
    redirect: "",
    preview: false,
  });
  //DESTRUCTURING ON SAVE RESPONSE MANAGEMENT STATE
  const { loading, error, success, redirect, preview } = indicators;

  // SUB REESUME DATA EDUCATION SECTION STATE
  const [education, setEducation] = useState({
    qualification_title: "",
    institute: "",
    board: "",
    passing_year: "",

    eid: "",
  });

  //DESTRUCTURING EDUCATION DATA
  const {
    qualification_title,
    institute,
    board,
    passing_year,
    eid,
  } = education;

  // SUB RESUME DATA EXPERIENCE SECTION STATE

  const [exp, setExp] = useState({
    organisation: "",
    position: "",
    work_details: [],
    joining_month: "null",
    joining_year: "null",
    leaving_month: "null",
    leaving_year: "null",
    exp_id: "",
  });

  //DESTRUCTURING EXPERIENCE DATA
  const {
    organisation,
    position,
    work_details,
    joining_month,
    joining_year,
    leaving_month,
    leaving_year,
    exp_id,
  } = exp;

  const [workList, setWorkList] = useState({
    workDetail: "",
    work_id: "",
  });

  const { workDetail, work_id } = workList;

  //SKILL DATA STATE
  const [skills_sub, setSkills_sub] = useState({
    skill: "",
    skill_level: "0",
    skill_id: "",
  });

  //DESTRUCTURING SKILL
  const { skill, skill_level, skill_id } = skills_sub;

  //Diploma DATA STATE
  const [diplomas, setDiplomas] = useState({
    diploma_title: "",
    diploma_institute: "",
    course_duration: "",
    date_of_completion: "",
    diploma_id: "",
  });

  //DESTRUCTURING SKILL
  const {
    diploma_title,
    diploma_institute,
    course_duration,
    date_of_completion,
    diploma_id,
  } = diplomas;

  // MATERILIZE CSS TEXT COUNTER
  useEffect(() => {
    const textCounter = document.querySelector(" #create_resume_short_pitch ");
    M.CharacterCounter.init(textCounter);
  }, []);

  // MATERILIZE CSS OPTIONS
  useEffect(() => {
    let elem = document.querySelectorAll("select");
    let insct = M.FormSelect.init(elem, {});
    return () => {
      insct.map((ins) => {
        return ins.destroy();
      });
    };
  }, [fresher]);

  //ERROR ON SAVING DETAILS
  useEffect(() => {
    if (error) {
      M.toast({
        html: error,
        classes: " red darken-4",
      });
      setIndicators({ ...indicators, error: "" });
    }
    //eslint-disable-next-line
  }, [error]);

  // MATERILIZE CSS RANGE SLIDER
  useEffect(() => {
    let elems = document.querySelectorAll("input[type=range]");
    M.Range.init(elems);
  }, []);

  // MATERILIZE CSS UPDATE TEXT FILED
  useEffect(() => {
    M.updateTextFields();
  }, []);

  const performRedirect = () => {
    if (success) {
      return <Redirect to={`/user/download/${redirect}`} />;
    }
  };

  //STATE CHANGE  HANDLER
  const changeHandler = (field, section) => (e) => {
    switch (section) {
      case "edu":
        setEducation({
          ...education,
          [field]: e.target.value,
          eid: Math.floor(100000000 + Math.random() * 900000000),
        });
        break;

      case "exp":
        setExp({
          ...exp,
          [field]: e.target.value,
          exp_id: Math.floor(100000000 + Math.random() * 900000000),
        });
        break;
      case "work":
        setWorkList({
          ...workList,
          [field]: e.target.value,
          work_id: Math.floor(100000000 + Math.random() * 900000000),
        });
        break;

      case "fresher":
        setResume({ ...resume, [field]: !fresher });
        break;

      case "dips":
        setDiplomas({
          ...diplomas,
          [field]: e.target.value,
          diploma_id: Math.floor(100000000 + Math.random() * 900000000),
        });

        break;

      case "skills":
        setSkills_sub({
          ...skills_sub,
          [field]: e.target.value,
          skill_id: Math.floor(100000000 + Math.random() * 900000000),
        });
        break;

      case "basic":
        setResume({ ...resume, [field]: e.target.value });
        break;

      case "contact":
        setResume({
          ...resume,
          contact_details: { ...contact_details, [field]: e.target.value },
        });
        break;
      case "address":
        setResume({
          ...resume,
          address: { ...address, [field]: e.target.value },
        });
        break;

      default:
        break;
    }
  };

  // ADD INFO
  const addInfo = (section) => (e) => {
    let tempArry;
    let eduConditions =
      templateId === "1"
        ? qualification_title.trim() === "" ||
          institute.trim() === "" ||
          board.trim() === "" ||
          passing_year.trim() === ""
        : qualification_title.trim() === "" ||
          institute.trim() === "" ||
          passing_year.trim() === "";
    let dipsCondition =
      templateId === "1"
        ? diploma_title.trim() === "" ||
          diploma_institute.trim() === "" ||
          course_duration.trim() === "" ||
          date_of_completion.trim() === ""
        : diploma_title.trim() === "" ||
          diploma_institute.trim() === "" ||
          date_of_completion.trim() === "";
    switch (section) {
      case "edu":
        if (eduConditions) {
          M.toast({
            html: "Please fill all the fields in the section",
            classes: "#e65100 orange darken-4",
          });
        } else {
          tempArry = academic_qualification;
          tempArry.unshift(education);
          setResume({ ...resume, academic_qualification: tempArry });
          setEducation({
            ...education,
            qualification_title: "",
            institute: "",
            board: "",
            passing_year: "",
            marks: "",
            eid: "",
          });
          tempArry = [];
        }

        break;
      case "work":
        if (workDetail.trim() === "") {
          M.toast({
            html: "Please fill the fields",
            classes: "#e65100 orange darken-4",
          });
        } else {
          tempArry = work_details;
          tempArry.unshift(workList);
          setExp({ ...exp, work_details: tempArry });
          setWorkList({
            ...workList,
            workDetail: "",
          });
          tempArry = [];
        }

        break;

      case "exp":
        if (
          organisation.trim() === "" ||
          position.trim() === "" ||
          joining_month === "null" ||
          joining_year === "null" ||
          leaving_month === "null" ||
          leaving_year === "null"
        ) {
          M.toast({
            html: "Please fill all the fields in the section",
            classes: "#e65100 orange darken-4",
          });
        } else {
          tempArry = experience;
          tempArry.unshift(exp);
          setResume({ ...resume, experience: tempArry });
          setExp({
            ...exp,
            organisation: "",
            position: "",
            work_details: [],
            joining_month: "null",
            joining_year: "null",
            leaving_month: "null",
            leaving_year: false,
            exp_id: "",
          });

          tempArry = [];
        }

        break;
      case "dips":
        if (dipsCondition) {
          M.toast({
            html: "Please fill all the fields in the section",
            classes: "#e65100 orange darken-4",
          });
        } else {
          tempArry = certificates_diplomas;
          tempArry.unshift(diplomas);
          setResume({ ...resume, certificates_diplomas: tempArry });
          setDiplomas({
            ...diplomas,
            diploma_title: "",
            diploma_institute: "",
            course_type: "",
            course_duration: "",
            date_of_completion: "",
            diploma_id: "",
          });
          tempArry = [];
        }

        break;
      case "skills":
        if (skill.trim() === "") {
          M.toast({
            html: "Please enter the skill",
            classes: "#e65100 orange darken-4",
          });
        } else {
          tempArry = skills;
          tempArry.unshift(skills_sub);
          setResume({ ...resume, skills: tempArry });
          setSkills_sub({
            ...skills_sub,
            skill: "",
            skill_level: "0",
            skill_id: "",
          });
          tempArry = [];
        }

        break;
      default:
        break;
    }
  };

  //REMOVE INFO
  const removeInfo = (id, section) => (e) => {
    e.preventDefault();
    let newArry;
    switch (section) {
      case "edu":
        newArry = academic_qualification.filter((edu) => edu.eid !== id);
        setResume({ ...resume, academic_qualification: newArry });
        break;
      case "exp":
        newArry = experience.filter((expe) => expe.exp_id !== id);
        setResume({ ...resume, experience: newArry });
        break;
      case "work":
        newArry = work_details.filter((w) => w.work_id !== id);
        setExp({ ...exp, work_details: newArry });
        break;
      case "dips":
        newArry = certificates_diplomas.filter(
          (dips) => dips.diploma_id !== id
        );
        setResume({ ...resume, certificates_diplomas: newArry });
        break;
      case "skills":
        newArry = skills.filter((skill_sub) => skill_sub.skill_id !== id);
        setResume({ ...resume, skills: newArry });
        break;
      default:
        break;
    }
  };

  const submitResumeInfo = (e) => {
    e.preventDefault();
    if (
      firstname.trim() === "" ||
      contact_details.email.trim() === "" ||
      contact_details.mobile.trim() === "" ||
      profession.trim() === "" ||
      discription.trim() === "" ||
      address.line_1.trim() === "" ||
      address.city.trim() === "" ||
      address.state.trim() === ""
    ) {
      M.toast({
        html: "Please fill all the fields in the section",
        classes: " orange darken-4",
      });
    } else {
      setIndicators({ ...indicators, error: "", success: "", loading: true });
      saveResumeInfo(resume, token, user.id).then((data) => {
        if (data.error) {
          setIndicators({ ...indicators, error: data.error, loading: false });
        } else {
          setIndicators({
            ...indicators,
            loading: false,
            success: true,
            redirect: data,
          });
        }
      });
    }
  };

  const getPreview = (e) => {
    // e.preventDefault();
    setIndicators({ ...indicators, preview: !preview });
  };

  //MONTH ARRAYS FOR SELECT TAG
  const addMonth = () => {
    let months = [];
    let monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    function month(value, label) {
      this.value = value;
      this.label = label;
    }
    for (let i = 1; i <= 12; i++) {
      var m = new month(monthName[i - 1], monthName[i - 1]);
      months.push(m);
    }
    return months;
  };

  //YEAR ARRAYS FOR SELECT TAG
  const addYears = () => {
    let years = [];
    function year(value, label) {
      this.value = value;
      this.label = label;
    }
    for (let i = 1990; i <= new Date().getFullYear(); i++) {
      let y = new year(i, i);
      years.push(y);
    }
    return years;
  };

  const basicInfoForm = (
    <div className="row basic-template-row">
      <div className=" col s12 create-resume-section-heading">Basic Info</div>
      <div className="col s12 m4 offset-m1 input-field">
        <input
          id="create_resume_first_name"
          type="text"
          className="validate"
          value={firstname}
          onChange={changeHandler("firstname", "basic")}
        />
        <label htmlFor="create_resume_first_name">First Name</label>
      </div>
      <div className="col s12 m4 input-field">
        <input
          id="create_resume_last_name"
          type="text"
          className="validate"
          value={lastname}
          onChange={changeHandler("lastname", "basic")}
        />
        <label htmlFor="create_resume_last_name">Last Name</label>
      </div>
      <div className="col s12 m4 offset-m1 input-field">
        <input
          id="create_resume_profession"
          type="text"
          className="validate"
          value={profession}
          onChange={changeHandler("profession", "basic")}
        />
        <label htmlFor="create_resume_profession">Professional Title</label>
      </div>
      <div className="col s12 m4 input-field">
        <textarea
          id="create_resume_short_pitch"
          className="materialize-textarea"
          data-length="500"
          value={discription}
          onChange={changeHandler("discription", "basic")}
        ></textarea>
        <label htmlFor="create_resume_short_pitch">
          Short pitch about yourself
        </label>
      </div>
    </div>
  );

  const contactInfoForm = (
    <div className="row basic-template-row">
      <div className="s12 col create-resume-section-heading">Contact Info</div>
      <div className="col s12 m4 offset-m1 input-field">
        <input
          id="create_resume_email"
          type="email"
          className="validate"
          value={contact_details.email}
          onChange={changeHandler("email", "contact")}
        />
        <label htmlFor="create_resume_email">Email</label>
      </div>
      <div className="col s12 m4 input-field">
        <input
          id="create_resume_mobile"
          type="text"
          className="validate"
          value={contact_details.mobile}
          onChange={changeHandler("mobile", "contact")}
        />
        <label htmlFor="create_resume_mobile">Mobile Number</label>
      </div>
    </div>
  );

  const addressInfoForm = (
    <div className="row basic-template-row">
      <div className="s12 col create-resume-section-heading">Address Info</div>
      <div className="col s12 m4 offset-m1 input-field">
        <input
          id="create_resume_address_line_1"
          type="text"
          className="validate"
          value={address.line_1}
          onChange={changeHandler("line_1", "address")}
        />
        <label htmlFor="create_resume_address_line_1">Line 1</label>
      </div>
      <div className="col s12 m4 input-field">
        <input
          id="create_resume_address_line_2"
          type="text"
          className="validate"
          value={address.line_2}
          onChange={changeHandler("line_2", "address")}
        />
        <label htmlFor="create_resume_address_line_2">Line 2</label>
      </div>
      <div className="col s12 m4 offset-m1 input-field">
        <input
          id="create_resume_address_line_3"
          type="text"
          className="validate"
          value={address.line_3}
          onChange={changeHandler("line_3", "address")}
        />
        <label htmlFor="create_resume_address_line_3">Line 3</label>
      </div>
      <div className="col s12 m4 input-field">
        <input
          id="create_resume_address_city"
          type="text"
          className="validate"
          value={address.city}
          onChange={changeHandler("city", "address")}
        />
        <label htmlFor="create_resume_address_city">City</label>
      </div>
      <div className="col s12 m4 offset-m1 input-field">
        <input
          id="create_resume_address_state"
          type="text"
          className="validate"
          value={address.state}
          onChange={changeHandler("state", "address")}
        />
        <label htmlFor="create_resume_address_state">State</label>
      </div>
    </div>
  );

  const academicQualificationForm = (
    <div className="row basic-template-row">
      <div className="s12 col create-resume-section-heading">
        Academic Qualification
      </div>
      <div className="row education-table-row">
        <div className="col s12 m10 offset-m1 education-table-wrapper">
          <table className="highlight responsive-table">
            <thead>
              <tr>
                <th>Qualification</th>
                <th>School/University</th>
                {templateId === "1" && <th>Board</th>}
                <th>Passing Year</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {academic_qualification.map((data) => {
                return (
                  <tr key={data.eid}>
                    <td>{data.qualification_title}</td>
                    <td>{data.institute}</td>
                    {templateId === "1" && <td>{data.board}</td>}
                    <td>{data.passing_year}</td>

                    <td>
                      <button
                        onClick={removeInfo(data.eid, "edu")}
                        className="btn-flat  create-resuem-table-remove-btn"
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col s12 m4 offset-m1 input-field">
        <input
          id="create_resume_qualification"
          type="text"
          className="validate"
          value={qualification_title}
          onChange={changeHandler("qualification_title", "edu")}
        />
        <label htmlFor="create_resume_qualification">Qualification</label>
      </div>
      <div className="col s12 m4 input-field">
        <input
          id="create_resume_school_collage"
          type="text"
          className="validate"
          value={institute}
          onChange={changeHandler("institute", "edu")}
        />
        <label htmlFor="create_resume_school_collage">
          School/Collage Name
        </label>
      </div>
      {templateId === "1" && (
        <div className="col s12 m4 offset-m1 input-field">
          <input
            id="create_resume_board_university"
            type="text"
            className="validate"
            value={board}
            onChange={changeHandler("board", "edu")}
          />
          <label htmlFor="create_resume_board_university">
            Board/University
          </label>
        </div>
      )}
      <div
        className={
          templateId !== "1"
            ? "col s12 m4 offset-m1 input-field"
            : "col s12 m4  input-field"
        }
      >
        <input
          id="create_resume_passing_year"
          type="text"
          className="validate"
          value={passing_year}
          onChange={changeHandler("passing_year", "edu")}
        />
        <label htmlFor="create_resume_passing_year">Passing Year</label>
      </div>
      <div className="col s12 m4 input-field center">
        <button
          className="btn waves-effect waves-light"
          onClick={addInfo("edu")}
        >
          ADD
        </button>
      </div>
    </div>
  );

  const experianceInfoForm = (
    <div className="row basic-template-row">
      <div className="s12 col create-resume-section-heading">
        Experience Info
      </div>
      <div className="row education-table-row">
        <div className="col s12 m4 offset-m1 input-field">
          <div className="smallheading">Fresher</div>
          <div className="switch">
            <label>
              Off
              <input
                type="checkbox"
                value={fresher}
                onChange={changeHandler("fresher", "fresher")}
              />
              <span className="lever"></span>
              On
            </label>
          </div>
        </div>
      </div>
      {fresher ? (
        ""
      ) : (
        <Fragment>
          <div className="row education-table-row">
            <div className="col s12 m10 offset-m1 education-table-wrapper">
              <table className="highlight responsive-table">
                <thead>
                  <tr>
                    <th>Organization</th>
                    <th>Position</th>
                    <th>Joining Date</th>
                    <th>Leaving Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {experience.map((expe) => {
                    return (
                      <tr key={expe.exp_id}>
                        <td>{expe.organisation}</td>
                        <td>{expe.position}</td>
                        <td>{expe.joining_month + "," + expe.joining_year}</td>
                        <td>{expe.leaving_month + "," + expe.leaving_year}</td>
                        <td>
                          <button
                            onClick={removeInfo(expe.exp_id, "exp")}
                            className="btn-flat create-resuem-table-remove-btn"
                          >
                            <i className="far fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m4 offset-m1 input-field">
              <input
                id="create_resume_exp_organozation"
                type="text"
                className="validate"
                value={organisation}
                onChange={changeHandler("organisation", "exp")}
              />
              <label htmlFor="create_resume_exp_organozation">
                Organization
              </label>
            </div>
            <div className="col s12 m4 input-field">
              <input
                id="create_resume_exp_position"
                type="text"
                className="validate"
                value={position}
                onChange={changeHandler("position", "exp")}
              />
              <label htmlFor="create_resume_exp_position">Position</label>
            </div>
          </div>
          <div className="row">
            <div className="col s6 m2 offset-m1 input-field">
              <select
                value={joining_month}
                onChange={changeHandler("joining_month", "exp")}
              >
                <option value="null" disabled>
                  Select Month
                </option>
                {addMonth().map((month) => {
                  return (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  );
                })}
              </select>

              <label>Joining Month</label>
            </div>
            <div className="col s6 m2 input-field">
              <select
                value={joining_year}
                onChange={changeHandler("joining_year", "exp")}
              >
                <option value="null" disabled>
                  Select Year
                </option>
                {addYears().map((year) => {
                  return (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  );
                })}
              </select>

              <label>Joining Year</label>
            </div>
            <div className="col s6 m2  input-field">
              <select
                value={leaving_month}
                onChange={changeHandler("leaving_month", "exp")}
              >
                <option value="null" disabled>
                  Select Month
                </option>
                {addMonth().map((month) => {
                  return (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  );
                })}
              </select>

              <label>Leaving month</label>
            </div>
            <div className="col s6 m2 input-field">
              <select
                value={leaving_year}
                onChange={changeHandler("leaving_year", "exp")}
              >
                <option value="null" disabled>
                  Select Year
                </option>
                {addYears().map((year) => {
                  return (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  );
                })}
              </select>

              <label>Leaving Year</label>
            </div>
          </div>

          <div className="col s12 m4 offset-m1 input-field">
            <button
              className="btn waves-effect waves-light"
              onClick={addInfo("exp")}
            >
              ADD
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );

  const experianceInfoFormType2 = (
    <div className="row basic-template-row">
      <div className="s12 col create-resume-section-heading">
        Experience Info
      </div>
      <div className="row education-table-row">
        <div className="col s12 m4 offset-m1 input-field">
          <div className="smallheading">Fresher</div>
          <div className="switch">
            <label>
              Off
              <input
                type="checkbox"
                value={fresher}
                onChange={changeHandler("fresher", "fresher")}
              />
              <span className="lever"></span>
              On
            </label>
          </div>
        </div>
      </div>
      {fresher ? (
        ""
      ) : (
        <Fragment>
          <div className="row education-table-row">
            <div className="col s12 m10 offset-m1 experience-view-wrapper">
              {experience.map((expe, index) => {
                return (
                  <div key={index} className="row">
                    <div className="col s10 m10">
                      <div className="exp-list-org">{expe.organisation}</div>
                      <div className="exp-list-position">{expe.position}</div>

                      <div className="exp-list-dates">
                        {expe.joining_month +
                          "," +
                          expe.joining_year +
                          " - " +
                          expe.leaving_month +
                          "," +
                          expe.leaving_year}
                      </div>
                      <div className="exp-list-work-details">
                        {expe.work_details.map((data, index) => {
                          return <div key={index}>{data.workDetail}</div>;
                        })}
                      </div>
                    </div>
                    <div className="col s2 m2">
                      <button
                        onClick={removeInfo(expe.exp_id, "exp")}
                        className="btn-flat create-resuem-table-remove-btn"
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="row">
            <div className="col s12 m4 offset-m1 input-field">
              <input
                id="create_resume_exp_organozation"
                type="text"
                className="validate"
                value={organisation}
                onChange={changeHandler("organisation", "exp")}
              />
              <label htmlFor="create_resume_exp_organozation">
                Organization
              </label>
            </div>
            <div className="col s12 m4 input-field">
              <input
                id="create_resume_exp_position"
                type="text"
                className="validate"
                value={position}
                onChange={changeHandler("position", "exp")}
              />
              <label htmlFor="create_resume_exp_position">Position</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m8 offset-m1 input-field">
              {work_details.map((data, index) => {
                return (
                  <div key={index} className="row">
                    <div className="col s8 m8">{data.workDetail}</div>
                    <div className="col s4 m4">
                      <button
                        onClick={removeInfo(data.work_id, "work")}
                        className="btn-flat create-resuem-table-remove-btn"
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="row"></div>
            </div>
            <div className="col s12 m4 offset-m1 input-field">
              <input
                id="create_resume_exp_work_details"
                type="text"
                className="validate"
                value={workDetail}
                onChange={changeHandler("workDetail", "work")}
              />
              <label htmlFor="create_resume_exp_work_details">
                Work Details
              </label>
            </div>
            <div className="col s12 m4">
              <button
                className="btn waves-effect waves-light"
                onClick={addInfo("work")}
              >
                ADD
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col s6 m2 offset-m1 input-field">
              <select
                value={joining_month}
                onChange={changeHandler("joining_month", "exp")}
              >
                <option value="null" disabled>
                  Select Month
                </option>
                {addMonth().map((month) => {
                  return (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  );
                })}
              </select>

              <label>Joining Month</label>
            </div>
            <div className="col s6 m2 input-field">
              <select
                value={joining_year}
                onChange={changeHandler("joining_year", "exp")}
              >
                <option value="null" disabled>
                  Select Year
                </option>
                {addYears().map((year) => {
                  return (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  );
                })}
              </select>

              <label>Joining Year</label>
            </div>
            <div className="col s6 m2  input-field">
              <select
                value={leaving_month}
                onChange={changeHandler("leaving_month", "exp")}
              >
                <option value="null" disabled>
                  Select Month
                </option>
                {addMonth().map((month) => {
                  return (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  );
                })}
              </select>

              <label>Leaving month</label>
            </div>
            <div className="col s6 m2 input-field">
              <select
                value={leaving_year}
                onChange={changeHandler("leaving_year", "exp")}
              >
                <option value="null" disabled>
                  Select Year
                </option>
                {addYears().map((year) => {
                  return (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  );
                })}
              </select>

              <label>Leaving Year</label>
            </div>
          </div>

          <div className="col s12 m4 offset-m1 input-field">
            <button
              className="btn waves-effect waves-light"
              onClick={addInfo("exp")}
            >
              ADD
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );

  const diploma_certificateInfoForm = (
    <div className="row basic-template-row">
      <div className="s12 col create-resume-section-heading">
        Diplomas/Certificates
      </div>
      <div className="row education-table-row">
        <div className="col s12 m10 offset-m1 education-table-wrapper">
          <table className="highlight responsive-table">
            <thead>
              <tr>
                <th>Course Title</th>
                <th>Institute</th>

                {templateId === "1" && <th>Course Duration (in Month)</th>}
                <th>Date of completion (Month,Year)</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {certificates_diplomas.map((data) => {
                return (
                  <tr key={data.diploma_id}>
                    <td>{data.diploma_title}</td>
                    <td>{data.diploma_institute}</td>

                    {templateId === "1" && <td>{data.course_duration}</td>}
                    <td>{data.date_of_completion}</td>
                    <td>
                      <button
                        onClick={removeInfo(data.diploma_id, "dips")}
                        className="btn-flat  create-resuem-table-remove-btn"
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col s12 m4 offset-m1 input-field">
        <input
          id="create_resume_diploma_title"
          type="text"
          className="validate"
          value={diploma_title}
          onChange={changeHandler("diploma_title", "dips")}
        />
        <label htmlFor="create_resume_diploma_title">Course Name</label>
      </div>
      <div className="col s12 m4 input-field">
        <input
          id="create_resume_diploma_institute"
          type="text"
          className="validate"
          value={diploma_institute}
          onChange={changeHandler("diploma_institute", "dips")}
        />
        <label htmlFor="create_resume_diploma_institute">Institute</label>
      </div>

      {templateId === "1" && (
        <div className="col s12 m4  offset-m1 input-field">
          <input
            id="create_resume_course_duration"
            type="text"
            className="validate"
            value={course_duration}
            onChange={changeHandler("course_duration", "dips")}
          />
          <label htmlFor="create_resume_course_duration">
            Course Duration (in months)
          </label>
        </div>
      )}
      <div
        className={
          templateId !== "1"
            ? "col s12 m4 offset-m1  input-field"
            : "col s12 m4  input-field"
        }
      >
        <input
          id="create_resume_date_of_completion"
          type="text"
          className="validate"
          value={date_of_completion}
          onChange={changeHandler("date_of_completion", "dips")}
        />
        <label htmlFor="create_resume_date_of_completion">
          Date of completion (Month,Year/ ex. January, 2019)
        </label>
      </div>
      <div className="col s12 m4 input-field center">
        <button
          className="btn waves-effect waves-light"
          onClick={addInfo("dips")}
        >
          ADD
        </button>
      </div>
    </div>
  );
  const skillInfoForm = (
    <div className="row basic-template-row">
      <div className="s12 col create-resume-section-heading">Skills</div>
      <div className="row education-table-row">
        <div className="col s12 m10 offset-m1 education-table-wrapper">
          <table className="highlight responsive-table">
            <thead>
              <tr>
                <th>Skill </th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {skills.map((data) => {
                return (
                  <tr key={data.skill_id}>
                    <td>{data.skill}</td>
                    <td>
                      <button
                        onClick={removeInfo(data.skill_id, "skills")}
                        className="btn-flat  create-resuem-table-remove-btn"
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col s12 m4 offset-m1 input-field">
        <input
          id="create_resume_skills"
          type="text"
          className="validate"
          value={skill}
          onChange={changeHandler("skill", "skills")}
        />
        <label htmlFor="create_resume_skills">Skill</label>
      </div>
      <div className="col s12 m4 input-field center">
        <button
          className="btn waves-effect waves-light"
          onClick={addInfo("skills")}
        >
          ADD
        </button>
      </div>
    </div>
  );

  const skillInfoFormType2 = (
    <div className="row basic-template-row">
      <div className="s12 col create-resume-section-heading">Skills</div>
      <div className="row education-table-row">
        <div className="col s12 m10 offset-m1 education-table-wrapper">
          <table className="highlight responsive-table">
            <thead>
              <tr>
                <th>Skill </th>
                <th>Skill Level</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {skills.map((data) => {
                return (
                  <tr key={data.skill_id}>
                    <td>{data.skill}</td>
                    <td>
                      <div className="progress skill-progress-bar">
                        <div
                          className="determinate"
                          style={{ width: `${data.skill_level}%` }}
                        ></div>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={removeInfo(data.skill_id, "skills")}
                        className="btn-flat  create-resuem-table-remove-btn"
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col s12 m4 offset-m1 input-field">
        <input
          id="create_resume_skills"
          type="text"
          className="validate"
          value={skill}
          onChange={changeHandler("skill", "skills")}
        />
        <label htmlFor="create_resume_skills">Skill</label>
      </div>
      <div className="col s12 m4">
        <p className="skill-label">Skill Level</p>
        <p className="range-field skill-range">
          <input
            type="range"
            value={skill_level}
            min="0"
            max="100"
            onInput={changeHandler("skill_level", "skills")}
            onChange={changeHandler("skill_level", "skills")}
          />
        </p>
      </div>
      <div className="col s12 m4 center">
        <button
          className="btn waves-effect waves-light"
          onClick={addInfo("skills")}
        >
          ADD
        </button>
      </div>
    </div>
  );

  const submitButton = (
    <div className="row">
      <div className="col s12 m4 offset-m1  create-resume-save-button">
        <button
          onClick={submitResumeInfo}
          className="waves-effect waves-light btn"
        >
          Save Details and Download
        </button>
      </div>
      <div className="col s12 m4   create-resume-save-button">
        <button
          onClick={getPreview}
          data-target="PDFpreview"
          className="btn modal-trigger"
          disabled={loading ? true : false}
        >
          Preview
        </button>
      </div>
    </div>
  );
  const pageHeading = (
    <div className="row  create-resume-heading-container">
      <div className="col s12 create-resume-heading">Create Resume</div>
    </div>
  );
  const templateForm1 = (
    <Fragment>
      {pageHeading}
      <div className="create-resume-form-container">
        {basicInfoForm}
        {contactInfoForm}
        {addressInfoForm}
        {experianceInfoForm}
        {academicQualificationForm}
        {diploma_certificateInfoForm}
        {skillInfoForm}
        {submitButton}
      </div>
    </Fragment>
  );
  const templateForm2 = (
    <Fragment>
      {pageHeading}
      <div className="create-resume-form-container">
        {basicInfoForm}
        {contactInfoForm}
        {addressInfoForm}
        {experianceInfoForm}
        {academicQualificationForm}
        {diploma_certificateInfoForm}
        {skillInfoForm}
        {submitButton}
      </div>
    </Fragment>
  );
  const templateForm3 = (
    <Fragment>
      {pageHeading}
      <div className="create-resume-form-container">
        {basicInfoForm}
        {contactInfoForm}
        {addressInfoForm}
        {experianceInfoFormType2}
        {academicQualificationForm}
        {diploma_certificateInfoForm}
        {skillInfoFormType2}
        {submitButton}
      </div>
    </Fragment>
  );

  const templateForm4 = (
    <Fragment>
      {pageHeading}
      <div className="create-resume-form-container">
        {basicInfoForm}
        {contactInfoForm}
        {addressInfoForm}
        {experianceInfoFormType2}
        {academicQualificationForm}
        {diploma_certificateInfoForm}
        {skillInfoFormType2}
        {submitButton}
      </div>
    </Fragment>
  );
  const templateForm5 = (
    <Fragment>
      {pageHeading}
      <div className="create-resume-form-container">
        {basicInfoForm}
        {contactInfoForm}
        {addressInfoForm}
        {experianceInfoFormType2}
        {academicQualificationForm}
        {diploma_certificateInfoForm}
        {skillInfoForm}
        {submitButton}
      </div>
    </Fragment>
  );
  const templateForm6 = (
    <Fragment>
      {pageHeading}
      <div className="create-resume-form-container">
        {basicInfoForm}
        {contactInfoForm}
        {addressInfoForm}
        {experianceInfoFormType2}
        {academicQualificationForm}
        {diploma_certificateInfoForm}
        {skillInfoForm}
        {submitButton}
      </div>
    </Fragment>
  );

  const selectForm = () => {
    switch (templateId) {
      case "1":
        return templateForm1;

      case "2":
        return templateForm2;

      case "3":
        return templateForm3;

      case "4":
        return templateForm4;

      case "5":
        return templateForm5;

      case "6":
        return templateForm6;

      default:
        break;
    }
  };
  return (
    <BaseWrapper>
      {selectForm()}
      <PDFpreviewModal
        previewHandler={getPreview}
        isTrue={preview}
        templateId={templateId}
        resumeInfo={resume}
      />
      {performRedirect()}
    </BaseWrapper>
  );
};

export default CreateResume;
