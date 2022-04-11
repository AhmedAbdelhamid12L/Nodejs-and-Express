const { StatusCodes } = require("http-status-codes");
const Report = require("../Model/reportModel");
const Post = require("../../posts/Model/postModel");

const reportPostByUser = async (req, res) => {
  const { reportComment, userID, postID } = req.body;
  try {
    const userReport = await Report.findOne({ userID, postID });
    if (userReport) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ massage: "this user already add report in this post" });
    } else {
      const post = await Post.findOne({ _id: postID });
      if (post) {
        const newReport = new Report({ reportComment, userID, postID });
        const data = await newReport.save();
        await Post.updateOne(
          { _id: postID },
          { reports: [...post.reports, newReport._id] }
        );
        res
          .status(StatusCodes.CREATED)
          .json({ message: "Report Post success", data });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "invalid post id" });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

module.exports = {
  reportPostByUser,
};
