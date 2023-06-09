/**
 * a middleware to change the schema to the logged in user
 */

const pool = require("../../../loaders/pgDB");

const pathChanger = async (req, res, next) => {
  try {
    //   change the schema to the loged in user company
    await pool.query({
      name: "changePath",
      text: `set search_path to ${req.user.schema_name}`,
    });
    next();
  } catch (error) {
    throw error;
  }
};

module.exports = pathChanger;
