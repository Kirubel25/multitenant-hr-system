/**
 * a file to access all custom and third party middlewares
 * to the express stack of middlewares
 */

const express = require("express");
const ClientRouter = require("../src/apis/clients/routes");
const ComanyRouter = require("../src/apis/companies/router");
const EmployeeRouter = require("../src/apis/employee/router");
const geh = require("../src/geh");
const AppError = require("../utils/appError");

const app = express();

/**
 * add middlewares here
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/users", ClientRouter);
app.use("/api/v1/companies", ComanyRouter);
app.use("/api/v1/employees", EmployeeRouter);

// Unknown URL Error Message
app.use("*", (req, res, next) => {
  return next(
    new AppError(
      `Unknown URL - ${req.protocol}://${req.headers.host}${req.originalUrl}`,
      404
    )
  );
});

// use global error handler
app.use(geh);

// export app
module.exports = app;
