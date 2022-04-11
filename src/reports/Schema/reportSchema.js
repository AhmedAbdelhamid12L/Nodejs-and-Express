const { Schema } = require("mongoose");
const User = require("../../users/Model/userModel");``

const reportSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    postID: {
      type: Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    reportComment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// use hooks to populate

reportSchema.pre("save", function () {
  this.populate({
    path: "userID",
    select: "_id username location role",
    model: User,
  });
});


module.exports = reportSchema;
