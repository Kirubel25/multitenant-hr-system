const pool = require("../../../loaders/pgDB");

class EmployeeDAL {
  static async addEmployee(data, schema_name) {
    // create a single connection for transaction
    const client = await pool.connect();
    try {
      // start transaction
      await client.query("BEGIN");

      // add to employee table
      const { rows } = await client.query({
        name: "addEmployee",
        text: `insert into ${schema_name}.employees(full_name, email, password, status, role, schema_name) values ($1,$2,$3,coalesce($4,'Active')::status_types,$5,$6) RETURNING *`,
        values: [
          data.full_name,
          data.email,
          data.password,
          data.status,
          data.role,
          data.schema_name,
        ],
      });

      await client.query({
        name: "addUserToPublic",
        text: "insert into public.users(full_name, email,gender, password, status, role, schema_name) values ($1,$2,$3,$4,coalesce($5,'Active')::status_types,$6,$7)",
        values: [
          data.full_name,
          data.email,
          data.gender,
          data.password,
          data.status,
          data.role,
          data.schema_name,
        ],
      });

      await client.query("COMMIT");

      // return employee from the company
      return rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw new Error(error);
    } finally {
      // release the db connection
      client.release();
    }
  }
  static async findEmployeeById(id) {
    try {
      // find employee from db with given id
      const { rows } = await pool.query({
        name: "findEmployeeById",
        text: "select * from employees where id=$1",
        values: [id],
      });

      // return employee
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
  static async findAllEmployees() {
    const { rows } = pool.query({
      name: "findAllEmployees",
      text: "select * from employees",
    });

    // return all employees
    return rows;
  }
}

module.exports = EmployeeDAL;
