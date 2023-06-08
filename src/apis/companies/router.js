const router = require("express").Router();
const CompanyController = require("./controller");
const authorized = require("../../auth/authorization");

router.get("/:id", authorized, CompanyController.findCompanyById);

router
  .route("/")
  .post(authorized, CompanyController.createCompany)
  .get(authorized, CompanyController.findAllCompanies);

router
  .route("/user/companies")
  .get(authorized, CompanyController.findAllUserCompany);

// export router
module.exports = router;
