const router = require("express").Router();
const CompanyController = require("./controller");
const authorized = require("../../auth/authorization");

router.post("/", authorized, CompanyController.createCompany);

// export router
module.exports = router;
