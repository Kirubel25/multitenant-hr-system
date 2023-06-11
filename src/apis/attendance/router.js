const router = require("express").Router();
const AttendanceController = require("./controller");
const authorized = require("../../auth/authorization");
const pathChanger = require("../interceptor");

// Mount routes with controller methods
router.route("/").post(authorized, pathChanger, AttendanceController.create);

// Export
module.exports = router;
