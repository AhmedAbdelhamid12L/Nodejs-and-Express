const router = require('express').Router();
const {
  getPosts,
  addPost,
  deletePost,
  updatePosts,
  getUserPosts
} = require('../controller/postsController');

const isAuthorized = require('../../../common/Authorized/isAuthorized');
const validateReq = require('../../../common/Validate/validateRequest');
const { validatePostSchema } = require('../Validation/postValidation');
const { 
  GET_ALL_POSTS, 
  ADD_POST, 
  UPDATE_POST, 
  DELETE_POST, 
  GET_USER_POSTS
} = require('../endPointPost');


router.get('/posts', isAuthorized(GET_ALL_POSTS), getPosts)
router.get('/posts/:id', isAuthorized(GET_ALL_POSTS), getPosts)
router.post('/posts', validateReq(validatePostSchema), isAuthorized(ADD_POST), addPost)
router.put('/posts/:id', validateReq(validatePostSchema), isAuthorized(UPDATE_POST), updatePosts)
router.delete('/posts/:id', isAuthorized(DELETE_POST), deletePost)
router.get('/getUserPosts/:id', isAuthorized(GET_USER_POSTS), getUserPosts)




module.exports = router;