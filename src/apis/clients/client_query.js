/**
 * a data access layer to interact with the data base to client API
 */

// connection pool
const pool = require("../../../loaders/pgDB");

class ClientDAL {
  // signup for user
  static async signUp(data) {
    // Insert user data
    const { rows } = await pool.query({
      name: "UserSignUp",
      text: `INSERT INTO users(full_name,email,password,role,status,gender,tenant_name) 
             VALUES($1, $2, $3, $4, coalesce($5,'Active')::status_types, $6, $7) RETURNING *`,
      values: [
        data.full_name,
        data.email,
        data.password,
        data.role,
        data.status,
        data.gender,
        data.tenant_name,
      ],
    });

    return rows[0];
  }

  // fetch all user datas in the db
  static async fetchAll() {
    // query to fetch all user data
    const { rows } = await pool.query({
      name: "fetchAllUsers",
      text: "select * from users",
      values: [],
    });

    return rows;
  }

  // fetch a single user data from db
  static async fetchUser(id) {
    try {
      const { rows } = await pool.query({
        name: "fetchUserById",
        text: "select * from users where id=$1",
        values: [id],
      });

      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // update user
  static async updateUser(id, data) {
    try {
      const user = pool.query({
        name: "updateUser",
        text: "update users set full_name=coalesce($1, full_name), email=coalesce($2, email), password=coalesce($3, password), role=($4,role), gender=coalesce($5,gender), status=coalesce($6,status), tenant_name=coalesce($7,tenant_name) where id=$8 RETURNING *",
        values: [
          data.full_name,
          data.email,
          data.password,
          data.role,
          data.gender,
          data.status,
          data.tenant_name,
          id,
        ],
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  // delete user
  static async deleteUser(id) {
    try {
      const deletedUser = await pool.query({
        name: "deleteUser",
        text: "delete from users where id=$1",
        values: [id],
      });
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

  // find user by email
  static async findByEmail(email) {
    try {
      const { rows } = await pool.query({
        name: "findByEmail",
        text: "select * from public.users where email=$1",
        values: [email],
      });

      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ClientDAL;
