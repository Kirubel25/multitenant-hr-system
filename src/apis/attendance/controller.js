const AttendanceDAL = require("./dal");
const AppError = require("../../../utils/appError");
const EmployeesDAL = require("../employee/dal");

// Create attendance
exports.create = async (req, res, next) => {
  try {
    // Incoming data
    const data = req.body;

    if ((!data.date, !data.presence))
      return next(new AppError("Please fill required fields", 400));

    // Find emp by email
    const emp = await EmployeesDAL.findByEmail(req.user.email);
    if (!emp) return next(new AppError("Account does not exist", 400));

    // Add employee id to "data"
    data.empId = emp.id;

    // Create attendance
    const attendance = await AttendanceDAL.create(data);

    // Response
    res.status(201).json({
      status: "Success",
      data: { attendance },
    });
  } catch (error) {
    next(error);
  }
};
