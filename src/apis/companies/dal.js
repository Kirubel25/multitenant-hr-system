const pool = require("../../../loaders/pgDB");
const AppError = require("../../../utils/appError");
const createTables = require("../../../utils/createTable");
const createSchema = require("../schema/createSchema");

/**
 * comaany database access layer
 */

class CompanyDAL {
  static async createCompany(data) {
    // connect to db to only one client since pool connection is not used for transaction
    const client = await pool.connect();

    try {
      // start transaction
      await client.query("BEGIN");

      const { rows } = await client.query({
        name: "CreateClient",
        text: "insert into companies(name,email,owner,status,schema_name) values ($1,$2,$3,coalesce($4,'Active')::status_types,$5) RETURNING *",
        values: [
          data.name,
          data.email,
          data.ownerId,
          data.status,
          data.schema_name,
        ],
      });

      // create schema
      await createSchema(client, data.schema_name);

      // create all tables
      await createTables(client);

      // excute and finish transaction
      await client.query("COMMIT");

      return rows[0];
    } catch (error) {
      // rollback transaction if error is thrown
      await client.query("ROLLBACK");
      throw new Error(error);
    } finally {
      // realse the connection
      client.release();
    }
  }

  static async findcompaniesOfUser(userId) {
    try {
      // get all companies from db
      const { rows } = await pool.query({
        name: "findAllCompanies",
        text: "SELECT * FROM companies WHERE owner=$1",
        values: [userId],
      });

      // return all companies creqated by the user
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

// export companyDAL class
module.exports = CompanyDAL;
