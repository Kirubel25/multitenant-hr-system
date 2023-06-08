/**
 * a controller file of client files
 */

const { query } = require("express");
const AppError = require("../../../utils/appError");
const ClientDAL = require("./client_query");
const hash = require("../../../utils/hashPassword");
const checkHash = require("../../../utils/comparePassword");
const createToken = require("../../../utils/generateToken");

// user register function
exports.signUp = async (req, res, next) => {
  try {
    const data = req.body;
    // check for any missing required field
    if (
      !data.full_name ||
      !data.email ||
      !data.gender ||
      !data.password ||
      !data.role
    ) {
      return next(new AppError("Please fill all required fields", 400));
    }

    // hash password
    data.password = hash(data.password);

    // user register query
    const users = await ClientDAL.signUp(data);

    // respose
    res.status(201).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchAllUsers = async (req, res, next) => {
  try {
    // query for fetch all user
    const allUsersData = await ClientDAL.fetchAll();

    // response
    res.status(200).json({
      message: "success",
      data: allUsersData,
    });
  } catch (error) {
    throw error;
  }
};

// get a single user from database
exports.fetchUserById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await ClientDAL.fetchUser(id);
    if (!user) {
      return next(new AppError("user does not exist", 404));
    }

    // response
    res.status(200).json({
      message: "succes",
      data: user,
    });
  } catch (error) {
    throw error;
  }
};

// update user from db
exports.updateUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;

    // check for user
    const user = await ClientDAL.fetchUser(id);

    // validate if user exists
    if (!user) {
      return next(new AppError("user not found", 404));
    }

    // update user
    const { rows } = await ClientDAL.updateUser(id, data);

    // response
    res.status(200).json({
      message: "success",
      data: rows[0],
    });
  } catch (error) {
    throw error;
  }
};

// delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    // check for user
    const user = await ClientDAL.fetchUser(id);

    // validate if user exists
    if (!user) {
      return next(new AppError("user not found", 404));
    }

    const deleted = await ClientDAL.deleteUser(id);
    res.status(202).json({
      message: "success",
    });
  } catch (error) {
    throw error;
  }
};

// singIn user
exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(password);
    // check for email and password in the request body
    if (!email || !password) {
      return next(new AppError("Email and Password are required", 401));
    }
    //Find user by email
    const user = await ClientDAL.findByEmail(email);
    console.log(user.password);

    if (!user || !checkHash(password, user.password)) {
      return next(new AppError("check for your credential", 400));
    }
    // generate token
    const token = createToken({ id: user.id });

    // response
    res.status(200).json({
      status: "success",
      message: "user logged in successfully",
      data: { user },
      token,
    });
  } catch (error) {
    throw error;
  }
};
