const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../../src/users/Model/userModel");
const rbac = require("../rbac/rbac");

module.exports = (endpoint) => {
  return async (req, res, next) => {
    // console.log(req.headers.authorization);
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      // console.log(token);
      if (token) {
        try {
          var decoded = jwt.verify(token, process.env.SECRET_KEY);
          // console.log(decoded);
          const user = await User.findOne({ _id: decoded._id });
          if (user) {
            // console.log(user);
            // console.log(user.role , roles);
            req.user = user;
            // const found = roles.find((r)=> r == user.role);
            // console.log(found);
            const isAllowed = await rbac.can(user.role, endpoint);
            if (isAllowed) {
              next();
            } else {
              res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ massege: "UNAUTHORIZED" });
            }
          } else {
            res
              .status(StatusCodes.UNAUTHORIZED)
              .json({ massege: "UNAUTHORIZED" });
          }
        } catch (error) {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ massege: "wrong token", error });
        }
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ massege: "UNAUTHORIZED" });
      }
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({ massege: "UNAUTHORIZED" });
    }
  };
};
