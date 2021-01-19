var mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    verify_token: String,
    verified: {
      type: Boolean,
      default: false,
    },
    forgotPassword_Token: {
      type: String,
    },
    forgotPassword_link_expire: {
      type: Date,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// For encrypted Pasword
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  // for authenticate Pass word while log in
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encry_password;
  },

  securePassword: function (pass) {
    if (!pass) return "";
    try {
      return crypto.createHmac("sha256", this.salt).update(pass).digest("hex");
    } catch (err) {
      return err;
    }
  },
};

module.exports = mongoose.model("User", userSchema);
