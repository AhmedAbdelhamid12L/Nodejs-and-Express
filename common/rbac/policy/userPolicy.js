
const { 
    ADD_POST, 
    DELETE_POST, 
    UPDATE_POST, 
    GET_USER_POSTS 
} = require("../../../src/posts/endPointPost");

const { UPDATE_USER, LOGOUT } = require("../../../src/users/endPointUser");

module.exports = [
    UPDATE_USER,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    GET_USER_POSTS,
    LOGOUT
]