const { StatusCodes } = require("http-status-codes");
const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../../common/services/sendEmail");
const templateUserVerification = require("../../../common/Templates/userVerification");
const pagination = require("../../../common/services/pagination");
const searchWhenGet = require("../../../common/services/searchWhenGet");
const sendToken = require("../../../common/services/sendToken");

const getUser = async (req, res) => {
  const { id } = req.params;
  let { search, page, size } = req.query;
  const { limit, skip } = pagination(page, size);

  try {
    const { data, total, totalPages } = await searchWhenGet(
      User,
      {role: "user"},
      skip,
      limit,
      id,
      search,
      ["username", "email", "phone"]
    );
    if (!data) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Not Found Data" });
    }
    res.status(StatusCodes.OK).json({
      message: "success",
      total,
      totalPages,
      currentPage: page,
      data,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

const getAdmin = async (req, res) => {
  const { id } = req.params;
  let { search, page, size } = req.query;
  const { limit, skip } = pagination(page, size);

  try {
    const { data, total, totalPages } = await searchWhenGet(
      User,
      {role: "admin"},
      skip,
      limit,
      id,
      search,
      ["username", "email", "phone"]
    );
    if (!data) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Not Found Data" });
    }
    res.status(StatusCodes.OK).json({
      message: "success",
      total,
      totalPages,
      currentPage: page,
      data,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

const signUp = async (req, res) => {
  const { username, email, password, cpassword, phone, location } = req.body;
  // console.log(req.file);
  try {
    //check email
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ massage: "email is already exist" });
    } else if (password !== cpassword) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ massage: "cpassword must equal password" });
    } else {
      const userData = new User({
        username,
        email,
        password,
        cpassword,
        phone,
        location,
      });
      const data = await userData.save();
      let token = sendToken({ _id: data._id });
      const options = {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      };
      res.cookie("jwt", token, options);
      const info = await sendEmail(
        [email],
        "Email Verification",
        templateUserVerification(`verifiy/${token}`)
      );
      // console.log(info.messageId);
      if (info.messageId) {
        res
          .status(StatusCodes.CREATED)
          .json({ message: "added success", data });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Email cannot be sent" });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

const addAdmin = async (req, res) => {
  const { username, email, password, cpassword, phone, location, role } =
    req.body;
  // console.log(req.file);
  try {
    //check email
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ massage: "email is already exist" });
    } else if (password !== cpassword) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ massage: "cpassword must equal password" });
    } else {
      const userData = new User({
        username,
        email,
        password,
        cpassword,
        phone,
        location,
        role: "admin",
      });
      const data = await userData.save();
      let token = sendToken({ _id: data._id });
      const options = {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      };
      res.cookie("jwt", token, options);
      const info = await sendEmail(
        [email],
        "Email Verification Admins",
        templateUserVerification(`verifiy/${token}`)
      );
      // console.log(info.messageId);
      if (info.messageId) {
        res
          .status(StatusCodes.CREATED)
          .json({ message: "admin added success", data });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Email cannot be sent" });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

const verifiySignUp = async (req, res) => {
  const { token } = req.params;
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findOne({ _id: decoded._id });
  if (user) {
    const updateUser = await User.updateOne(
      { _id: decoded._id },
      { verified: true }
    );
    res.status(StatusCodes.OK).json({ message: "verified success" });
  } else {
    res.status(StatusCodes.FORBIDDEN).json({ message: "FORBIDDEN" });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check email
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ massage: "invalid email or password" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        if (!user.verified) {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: " email is not verified " });
        } else {
          let token = sendToken({ _id: user._id });
          const options = {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
          };
          res.cookie("jwt", token, options);
          const data = await User.findOne({ email })
            .select("-password")
            .select("-cpassword");
          res
            .status(StatusCodes.OK)
            .json({ message: "login success", token, data });
        }
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: " invalid email or password" });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, cpassword, phone, location } = req.body;
  try {
    const data = await User.updateMany({
      username,
      email,
      password,
      cpassword,
      phone,
      location,
    }).where({ _id: id });
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

const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { oldpassword, newpassword, cnewpassword } = req.body;

  const user = await User.findOne({ _id: id });
  const match = await bcrypt.compare(oldpassword, user.password);
  try {
    if (!match) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ massage: "oldpassword is Wrong" });
    } else if (newpassword !== cnewpassword) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ massage: "cnewpassword must equal newpassword" });
    } else {
      let hashnewPass = await bcrypt.hash(newpassword, 7);
      let hashcnewPass = await bcrypt.hash(cnewpassword, 7);
      const data = await User.findByIdAndUpdate(
        { _id: id },
        { password: hashnewPass, cpassword: hashcnewPass },
        { new: true }
      );
      if (data) {
        res
          .status(StatusCodes.CREATED)
          .json({ message: "updated success", data });
      } else {
        res.json({ message: "error data" });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ massage: "user with given does not exist" });
    } else {
      let token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      const link = `${process.env.SERVERLINK}/password-reset/${user._id}/${token}`;
      const info = await sendEmail([email], "Email Password Reset", link);
      // console.log(info.messageId);
      if (info.messageId) {
        res
          .status(StatusCodes.CREATED)
          .json({ message: "check your mail now" });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Email cannot be sent" });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    const user = await User.findById(id);
    if (!user && !token) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "invalid link or expired" });
    } else {
      user.password = password;
      await user.save();
      res
        .status(StatusCodes.OK)
        .json({ message: "password reset successfully" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.deleteMany({ _id: id, role: "user" });
    res.status(StatusCodes.OK).json({ message: "deleted success", data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.deleteMany({ _id: id, role: "admin" });
    res.status(StatusCodes.OK).json({ message: "admin deleted success", data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

const logOut = async (req, res) => {
  try {
    const options = {
      maxAge: 1,
    };
    res.cookie("jwt", "", options);
    res.status(StatusCodes.OK).json({ message: "logout success" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

module.exports = {
  getUser,
  getAdmin,
  signUp,
  addAdmin,
  verifiySignUp,
  logIn,
  updateProfile,
  updatePassword,
  resetPassword,
  forgetPassword,
  deleteUser,
  deleteAdmin,
  logOut,
};
