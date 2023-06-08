/**
 * denie access based on the user role
 */

const AppError = require("../../utils/appError");

const authRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Access Denied", 403));
    }
    next();
  };
};

// export authRole

module.exports = authRole;
