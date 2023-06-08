const router = require("express").Router();
const CompanyController = require("./controller");
const authorized = require("../../auth/authorization");

router
  .route("/")
  .post(authorized, CompanyController.createCompany)
  .get(authorized, CompanyController.findAllCompany);

// export router
module.exports = router;
