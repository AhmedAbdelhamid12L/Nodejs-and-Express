const Joi = require("joi");

module.exports = {
  validateReportSchema: {
    body: Joi.object().required().keys({
      userID: Joi.string().required(),
      postID: Joi.string().required(),
      reportComment: Joi.string().required(),
    }),
  }
};