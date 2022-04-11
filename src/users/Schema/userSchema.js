const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cpassword: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "superadmin"],
      default: "user",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// use hooks to hash password

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 7);
  next();
});

userSchema.pre("save", async function (next) {
  this.cpassword = await bcrypt.hash(this.cpassword, 7);
  next();
});

userSchema.pre("save", async function (next) {
  let newPhone = this.phone.toString();
  this.phone = await bcrypt.hash(newPhone, 7);
  next();
});

module.exports = userSchema;
