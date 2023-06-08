const createAttendanceTable = require("../src/apis/attendance/createAttendanceTable");
const createEmployeesTable = require("../src/apis/employee/createEmployeesTable");
/**
 * create tables for a company after schema is switched
 * @param {*} dbConnectionClient
 */
const createTables = async (dbConnectionClient) => {
  try {
    // create employee table
    await createEmployeesTable(dbConnectionClient);

    // create attendance table
    await createAttendanceTable(dbConnectionClient);
  } catch (error) {
    throw error;
  }
};

// export create table

module.exports = createTables;
