const Joi = require("joi");

const validateUserSchema = {
  // Validate On body
  body: Joi.object()
    .required()
    .keys({
      username: Joi.string().required(),
      email: Joi.string().required().email(),
      phone: Joi.number().required(),
      password: Joi.string().pattern(new RegExp("^.{8,12}$")).required(),
      cpassword: Joi.string().pattern(new RegExp("^.{8,12}$")).required(),
      location: Joi.string().required(),
    }),
};

const validatelogin = {
  // Validate On body
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().pattern(new RegExp("^.{8,12}$")).required(),
    }),
};

const validateChangePass = {
  // Validate On body
  body: Joi.object()
    .required()
    .keys({
      oldpassword: Joi.string().pattern(new RegExp("^.{8,12}$")).required(),
      newpassword: Joi.string().pattern(new RegExp("^.{8,12}$")).required(),
      cnewpassword: Joi.string().pattern(new RegExp("^.{8,12}$")).required(),
    }),
};

module.exports = {
  validateUserSchema,
  validatelogin,
  validateChangePass
};
