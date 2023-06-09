const router = require("express").Router();
const authorization = require("../../auth/authorization");
const authRole = require("../../auth/authRole");
const pathChanger = require("../interceptor");
const employeeController = require("./controller");

router
  .route("/:compId")
  .post(
    authorization,
    authRole("Owner", "Admin"),
    employeeController.addEmployee
  );

module.exports = router;
