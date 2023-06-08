const AppError = require("../../utils/appError");
const jwt = require("jsonwebtoken");
const authToken = require("./authToken");
const configs = require("../../utils/config");
const ClientDAL = require("../apis/clients/client_query");

/**
 * a middleware to chack if user can access the route or not
 */

const authorize = async (req, res, next) => {
  try {
    // get authorized token from header
    const token = authToken(req, next);

    //   verify the token which returns the payload consisting the user id
    const verifyToken = jwt.verify(token, configs.jwt.secret);

    if (!verifyToken) return next(new AppError("Please Login!", 401));

    //   fetch user by payload user id
    const user = await ClientDAL.fetchUser(verifyToken.id);
    if (!user) return next(new AppError("user not found", 400));

    req.user = user;
    next();
  } catch (error) {
    throw error;
  }
};

// export authorized
module.exports = authorize;
