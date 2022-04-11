const router = require("express").Router();
const {
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
} = require("../controller/usersController");

const {
  validateUserSchema,
  validatelogin,
  validateChangePass,
} = require("../Validation/userValidation");
const {
  GET_ALL_USERS,
  GET_ALL_ADMINS,
  UPDATE_USER,
  DELETE_USER,
  LOGOUT,
} = require("../endPointUser");

const isAuthorized = require("../../../common/Authorized/isAuthorized");
const validateReq = require("../../../common/Validate/validateRequest");

router.get("/users", isAuthorized(GET_ALL_USERS), getUser);
router.get("/users/:id", isAuthorized(GET_ALL_USERS), getUser);
router.get("/admins", isAuthorized(GET_ALL_ADMINS), getAdmin);
router.get("/admins/:id", isAuthorized(GET_ALL_ADMINS), getAdmin);
router.post("/login", validateReq(validatelogin), logIn);
router.post("/signup", validateReq(validateUserSchema), signUp);
router.post("/addadmin", validateReq(validateUserSchema), addAdmin);
router.get("/verifiy/:token", verifiySignUp);
router.put(
  "/users/:id",
  validateReq(validateUserSchema),
  isAuthorized(UPDATE_USER),
  updateProfile
);
router.patch(
  "/updatepassword/:id",
  validateReq(validateChangePass),
  isAuthorized(UPDATE_USER),
  updatePassword
);
router.delete("/users/:id", isAuthorized(DELETE_USER), deleteUser);
router.delete("/admins/:id", isAuthorized(DELETE_USER), deleteAdmin);

router.post("/password-reset", forgetPassword);
router.post("/password-reset/:id/:token", resetPassword);

router.get("/logout", isAuthorized(LOGOUT), logOut);

module.exports = router;
