const User = require("../models/user");
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.SENDGRID,
    },
  })
);
const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve(__dirname, "templates"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "templates"),
  extName: ".handlebars",
};

transporter.use("compile", hbs(handlebarOptions));

//GET USER BY ID
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      res.status(401).json({
        error: "Error finding user in DB",
      });
    }
    req.profile = user;
    next();
  });
};

//GET ALL USERS
exports.getAllUsersList = (req, res) => {
  User.find().exec((err, users) => {
    if (err || !users) {
      res.status(400).json({
        error: "Unable to get all users",
      });
    }
    res.status(200).json(users);
  });
};

//UPDATE USER INFO
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    {
      $set: {
        name: req.body.name,
      },
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "unable to update user",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

//VERIFY USER EMAIL

exports.verifyEmail = (req, res) => {
  User.findOne({ verify_token: req.body.verificationToken }).exec(
    (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: "Invalid Verification Token" });
      }
      user.verified = true;
      user.save((err, user) => {
        if (err) {
          return res.status(400).json({
            error: "Email Verification Failed",
          });
        }
        return res.status(200).json({
          message: "Email Verified",
        });
      });
    }
  );
};

//FORGET PASSWORD
exports.getForgotPasswordLink = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: "Email not registered",
      });
    }
    const Passwordtoken = jwt.sign({ _id: user._id }, process.env.SECRET);
    user.forgotPassword_Token = Passwordtoken;
    user.forgotPassword_link_expire = Date.now() + 3600000;
    user.save((err, user) => {
      if (err) {
        return res.status(401).json({ error: "Unable to Reset Password" });
      }

      //Dynamic Hostname
      var hostName = "";
      if (req.hostname === "localhost") {
        hostName = req.hostname + ":3000";
      } else {
        hostName = process.env.SENDGRID_URL;
      }
      var proto = req.protocol;

      var resetLink = `${proto}://${hostName}/resetpassword/${Passwordtoken}`;

      // Mail Info
      const mailInfo = {
        to: user.email,
        from: "creatorresume22@gmail.com",
        subject: "Reset Password",
        template: "resetPassword",
        context: {
          link: resetLink,
          name: user.name,
        },
      };

      //Sending Mail
      transporter.sendMail(mailInfo, (error, info) => {
        if (error) {
          return res.status(400).json({ error: "Unable to send mail" });
        } else {
          return res.status(200).json({
            message: "Email sent please check your email",
          });
        }
      });
    });
  });
};

exports.validateResetToken = (req, res) => {
  const token = req.body.token;
  User.findOne({
    forgotPassword_Token: token,
    forgotPassword_link_expire: { $gt: Date.now() },
  }).exec((err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "Link Expired",
      });
    } else {
      return res.status(200).json({
        message: "Token Verification Success",
      });
    }
  });
};
exports.resetPassword = (req, res) => {
  const newPassword = req.body.password;
  const token = req.body.token;
  User.findOne({
    forgotPassword_Token: token,
  }).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: "Error reseting password.",
      });
    } else {
      user.encry_password = user.securePassword(newPassword);
      user.save((err, user) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to reset password",
          });
        } else {
          return res.status(200).json({
            message: "Password Successfully Changed",
          });
        }
      });
    }
  });
};

//CONTACT US

exports.sendContactUs = (req, res) => {
  // Mail Info
  const mailInfo = {
    to: "creatorresume22@gmail.com",
    from: "creatorresume22@gmail.com",
    subject: req.body.emailSubject,
    template: "contactUs",
    context: {
      name: req.body.senderName,
      data: req.body.emailMessage,
      email: req.body.senderEmail,
    },
  };

  //Sending Mail
  transporter.sendMail(mailInfo, (error, info) => {
    if (error) {
      return res.status(400).json({ error: "Unable to send mail" });
    } else {
      return res.status(200).json({
        message: "Email sent",
      });
    }
  });
};
