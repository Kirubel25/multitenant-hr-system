const hashPassword = require("../../../utils/hashPassword");
const AppError = require("../../../utils/appError");
const ClientDAL = require("../clients/client_query");
const CompanyDAL = require("../companies/dal");
const EmployeeDAL = require("./dal");

exports.addEmployee = async (req, res, next) => {
  try {
    const compId = req.params.compId;
    const data = req.body;
    // get company
    const company = await CompanyDAL.findCompanyById(compId);

    // check if company exist
    if (!company) return next(new AppError("company does not exist", 404));

    // Check required fields
    if (!data.full_name || !data.email || !data.role) {
      return next(new AppError("Please fill all required fields", 400));
    }

    //  validate if user already exist
    const user = await ClientDAL.findByEmail(data.email);
    if (user) return next(new AppError("email is alredy in use", 400));

    // check if user is in the specified company
    if (
      req.user.role === "Owner" &&
      req.user.id !== company.owner &&
      req.user.schema_name !== company.schema_name
    ) {
      return next(new AppError("You are not in the right company", 400));
    }
    data.password = hashPassword("%TGBnhy6");
    data.schema_name = company.schema_name;
    // add employee
    const employee = await EmployeeDAL.addEmployee(data, company.schema_name);

    res.status(200).json({
      status: "Success",
      message: { employee },
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.findEmployeeById = async (req, res, next) => {
  try {
    const empId = req.params.id;

    // find user in the company with given id
    const employee = await EmployeeDAL.findEmployeeById(empId);

    if (!employee)
      return next(new AppError("Employee does not exist in your company", 404));

    res.status(200).json({
      status: "Success",
      data: { employee },
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.allEmployees = async (req, res, next) => {
  try {
    const employees = await EmployeeDAL.findAllEmployees();

    // check if employees exist in the company
    if (!employees)
      return next(new AppError("No Employees found in the company"));

    // return all employees
    res.status(200).json({
      status: "Success",
      data: { employees },
    });
  } catch (error) {
    throw error;
  }
};

exports.updateEmployees = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    data.id = id;

    // check if employee exist
    const employee = await EmployeeDAL.findEmployeeById(req.params.id);
    if (!employee) return next(new AppError("user does not exist", 404));

    // check if user exist on public
    const user = await ClientDAL.findByEmail(employee.email);
    if (!user) return next(new AppError("user does not exist", 404));

    data.publicId = user.id;

    const UpdatedEmp = await EmployeeDAL.updateEmployee(data);

    res.status(200).json({
      status: "Success",
      data: { UpdatedEmp },
    });
  } catch (error) {
    throw error;
  }
};
