const Client = require("pg/lib/client");
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
    try {
      const { rows } = await pool.query({
        name: "findAllEmployees",
        text: "select * from employees",
      });

      // return all employees
      return rows;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async updateEmployee(data, schema_name) {
    // need a single connection for a tansaction
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // update employee on public
      const { rows } = await client.query({
        name: "UpdateUserOnPublic",
        text: "update public.users set full_name=coalesce($1,full_name), email=coalesce($2,email),gender=coalesce($3,gender)::public.gender_types,password=coalesce($4,password),status=coalesce($5,status)::public.status_types,role=coalesce($6,role),schema_name=coalesce($7,schema_name) where id=$8 RETURNING *",
        values: [
          data.full_name,
          data.email,
          data.gender,
          data.password,
          data.status,
          data.role,
          data.schema_name,
          data.publicId,
        ],
      });

      // update employee on the comapny schema
      await client.query({
        name: "updaeEmployee",
        text: "update employees set full_name=coalesce($1,full_name), email=coalesce($2, email),password=coalesce($3,password),status=coalesce($4,status)::public.status_types,role=coalesce($5,role),schema_name=coalesce($6,schema_name) where id=$7 RETURNING *",
        values: [
          data.full_name,
          data.email,
          data.password,
          data.status,
          data.role,
          data.schema_name,
          data.id,
        ],
      });

      await client.query("COMMIT");

      // return updated employee
      return rows;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = EmployeeDAL;
