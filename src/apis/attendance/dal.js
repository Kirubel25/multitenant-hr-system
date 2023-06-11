const pool = require("../../../loaders/pgDB");

class AttendanceDAL {
  // Create attendance
  static async create(data) {
    try {
      const { rows } = await pool.query({
        name: "createAttendance",
        text: `insert into attendance(emp_id, date, presence) values($1, $2, $3) RETURNING *`,
        values: [data.empId, data.date, data.presence],
      });

      // Return inserted row data
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

// Export the DAL class
module.exports = AttendanceDAL;
