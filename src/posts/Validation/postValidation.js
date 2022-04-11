const Joi = require("joi");

// Validation where add & Update:

module.exports = {
  validatePostSchema: {
    // Validate On body
    body: Joi.object().required().keys({
      title: Joi.string().required(),
      post_content: Joi.string().required(),
      createdBy: Joi.string().required(),
      // commentsIds: Joi.string().required()
    }),
  }
};