const {
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  GET_ALL_POSTS,
  GET_USER_POSTS,
} = require("../../../src/posts/endPointPost");
const {
  GET_ALL_USERS,
  GET_ALL_ADMINS,
  DELETE_USER,
  LOGOUT,
  DELETE_ADMIN,
  UPDATE_USER,
} = require("../../../src/users/endPointUser");

module.exports = [
  GET_ALL_USERS,
  GET_ALL_ADMINS,
  UPDATE_USER,
  DELETE_USER,
  DELETE_ADMIN,
  LOGOUT,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  GET_ALL_POSTS,
  GET_USER_POSTS
];
