const { StatusCodes } = require("http-status-codes");
const Post = require("../Model/postModel");
const pagination = require("../../../common/services/pagination");
const searchWhenGet = require("../../../common/services/searchWhenGet");

const getPosts = async (req, res) => {
  const { id } = req.params;
  let { search, page, size } = req.query;
  const { limit, skip } = pagination(page, size);

  try {
    const { data, total, totalPages } = await searchWhenGet(
      Post,
      {},
      skip,
      limit,
      id,
      search,
      ["title", "post_content"]
    );
    if (!data) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Not Found Data" });
    } else {
      res.status(StatusCodes.OK).json({
        message: "success",
        total,
        totalPages,
        currentPage: page,
        data,
      });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

const addPost = async (req, res) => {
  const { title, post_content, createdBy } = req.body;
  try {
    const postData = new Post({ title, post_content, createdBy });
    const data = await postData.save();
    res.status(StatusCodes.CREATED).json({ message: "added success", data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

const updatePosts = async (req, res) => {
  const { id } = req.params;
  const { title, post_content, createdBy } = req.body;
  try {
    const data = await Post.updateMany({
      title,
      post_content,
      createdBy,
    }).where({
      _id: id,
    });
    if (data) {
      res
        .status(StatusCodes.CREATED)
        .json({ message: "updated success", data });
    } else {
      res.json({ message: "error data" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Post.deleteMany({ _id: id });
    res.status(StatusCodes.OK).json({ message: "deleted success", data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

// get Posts created By one user
const getUserPosts = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const data = await Post.find({ createdBy: id });
      if (data) {
        res.status(StatusCodes.OK).json({ message: "success", data });
      } else {
        res.json({ message: "invalid id" });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

module.exports = {
  getPosts,
  addPost,
  updatePosts,
  deletePost,
  getUserPosts,
};
