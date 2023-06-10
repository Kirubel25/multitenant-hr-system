const router = require("express").Router();
const authorization = require("../../auth/authorization");
const authRole = require("../../auth/authRole");
const pathChanger = require("../interceptor");
const employeeController = require("./controller");

router
  .route("/")
  .get(authorization, pathChanger, employeeController.allEmployees);
router
  .route("/:id")
  .get(authorization, pathChanger, employeeController.findEmployeeById);
router
  .route("/:compId")
  .post(
    authorization,
    authRole("Owner", "Admin"),
    employeeController.addEmployee
  );

module.exports = router;
