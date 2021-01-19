const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
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

// Sign Up
exports.signup = (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  const { email } = req.body;
  User.findOne({ email }, (err, user) => {
    if (user) {
      return res.status(409).json({ error: "Email Already Registered" });
    } else {
      const user = new User(req.body);
      user.save((err, user) => {
        if (err) {
          return res.status(400).json(err);
        }

        //saving verification token to user
        const verification_token = jwt.sign(
          { _id: user._id },
          process.env.SECRET
        );
        user.verify_token = verification_token;
        user.save((err, user) => {
          if (err) {
            return res.status(400).json(err);
          }

          //dynamic link
          var hostName = "";
          if (req.hostname === "localhost") {
            hostName = req.hostname + ":3000";
          } else {
            hostName = req.hostName;
          }
          var proto = req.protocol;
          var link = `${proto}://${hostName}/verifyemail/${verification_token}`;

          //Mail for verification
          const mailinfo = {
            to: user.email,
            from: "creatorresume22@gmail.com",
            subject: "Email Verification",
            template: "verification",
            context: {
              link: link,
              name: user.name,
            },
          };
          transporter.sendMail(mailinfo, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent");
            }
          });
        });

        res.json({
          name: user.name,
          email: user.email,
          id: user._id,
        });
      });
    }
  });
};

//Sign Up Ends

//LogIn
exports.logIn = (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "User Not Register" });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Password does Not Match",
      });
    }

    //Token creation
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //Create cookie
    res.cookie("token", token, {
      secure: true,
      sameSite: "none",
      expire: new Date() + 60000 * 60 * 24 * 10,
    });

    //sending response to front end
    const { _id, name, email, role, verified } = user;
    return res.json({
      token,
      user: {
        id: _id,
        name: name,
        email: email,
        role: role,
        verified: verified,
      },
    });
  });
};

//logOut
exports.logOut = (req, res) => {
  res.clearCookie("token");
  res.json({
    msg: "Loged Out Successfully",
  });
};

//protected Routes

exports.isLogedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied",
    });
  }
  next();
};

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }

  next();
};
exports.isVerified = (req, res, next) => {
  if (!req.profile.verified) {
    return res.status(401).json({
      error: "Please Verify Your Email",
    });
  }
  next();
};
