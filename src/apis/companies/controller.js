const AppError = require("../../../utils/appError");
const CompanyDAL = require("./dal");
const companyDAL = require("./dal");
/**
 * companies controller
 */

// create company
exports.createCompany = async (req, res, next) => {
  const data = req.body;
  try {
    // check required field comapnyname
    if (!data.name) return next(new AppError("name field is required", 404));

    //   add owner id to req data
    data.ownerId = req.user.id;
    console.log(data.ownerId);
    //   add unique schema
    data.schema_name = data.name + 1234;

    // create comapany
    const company = await companyDAL.createCompany(data);

    // response
    res.status(200).json({
      message: "success",
      data: { company },
    });
  } catch (error) {
    next(error);
  }
};

// find all companies of a user
exports.findAllCompany = async (req, res, next) => {
  try {
    const id = req.user.id;
    // get all companies
    const companies = await CompanyDAL.findcompaniesOfUser(id);

    // response
    res.status(200).json({
      status: "Success",
      data: { companies },
    });
  } catch (error) {
    throw error;
  }
};
