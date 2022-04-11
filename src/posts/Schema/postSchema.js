const { Schema } = require("mongoose");
const Report = require("../../reports/Model/reportModel");
const User = require("../../users/Model/userModel");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    post_content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    reports: [
      {
        type: Schema.Types.ObjectId,
        ref: "report",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// use hooks to populate

postSchema.pre("find", function () {
  this.populate({
    path: "createdBy",
    select: "_id username location role",
    model: User,
  });
});

postSchema.pre("findOne", function () {
  this.populate({
    path: "createdBy",
    select: "_id username location role",
    model: User,
  });
});

postSchema.pre("save", function () {
  this.populate({
    path: "createdBy",
    select: "_id username location role",
    model: User,
  });
});

postSchema.pre("find", function () {
  this.populate({
    path: "reports",
    select: "_id userID",
    model: Report,
  });
});

postSchema.pre("findOne", function () {
  this.populate({
    path: "reports",
    select: "_id userID",
    model: Report,
  });
});

postSchema.pre("save", function () {
  this.populate({
    path: "reports",
    select: "_id userID",
    model: Report,
  });
});

module.exports = postSchema;
