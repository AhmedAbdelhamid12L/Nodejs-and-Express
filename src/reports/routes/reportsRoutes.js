const router = require("express").Router();

const { reportPostByUser } = require("../controller/reportsController");
const { validateReportSchema } = require("../Validation/reportValidation");
const validateReq = require("../../../common/Validate/validateRequest");

router.post("/reports", validateReq(validateReportSchema), reportPostByUser);

module.exports = router;
