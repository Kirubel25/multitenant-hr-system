/**
 * Executes a query to create an attendance table
 */
const createAttendanceTable = async (dbConnectionClient) => {
  try {
    await dbConnectionClient.query({
      name: "createAttendanceTable",
      text: `CREATE TABLE attendance(
              id serial PRIMARY KEY,
              emp_id int not null REFERENCES employees(id) on DELETE CASCADE,
              date date not null,
              presence boolean not null,
              created_at timestamp DEFAULT CURRENT_TIMESTAMP
          )`,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Export
module.exports = createAttendanceTable;
