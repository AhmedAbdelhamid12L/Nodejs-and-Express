const { 
    GET_ALL_USERS, 
    DELETE_USER, 
    UPDATE_USER,
    LOGOUT
} = require('../../../src/users/endPointUser')

const { 
    ADD_POST, 
    DELETE_POST, 
    UPDATE_POST, 
    GET_USER_POSTS, 
    GET_ALL_POSTS 
} = require("../../../src/posts/endPointPost");



module.exports = [
    UPDATE_USER,
    GET_ALL_USERS, 
    DELETE_USER, 
    ADD_POST, 
    DELETE_POST, 
    UPDATE_POST, 
    GET_USER_POSTS, 
    GET_ALL_POSTS,
    LOGOUT
];