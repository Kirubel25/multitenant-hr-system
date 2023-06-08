/**
 * a file to create connection pool of postgress db
 */

const { Pool } = require("pg");
const configs = require("../utils/config");
const { configDotenv } = require("dotenv");

/**
 * create a connection pool of 30 clients from postgress db
 */
const pool = new Pool({
  user: configs.db.postgres.userName,
  password: configs.db.postgres.pswd,
  host: configs.db.postgres.host,
  port: configs.db.postgres.port,
  database: configs.db.postgres.database,
  max: configs.db.postgres.maxConn,
  idleTimeoutMillis: configs.db.postgres.idleTimeOut,
  connectionTimeoutMillis: configs.db.postgres.connTimeOut,
});

// Listen for events

pool.on("connect", () => {
  console.log("User connected to DB");
});

pool.on("acquire", () => {
  console.log("Client from the pool acquired");
});

pool.on("release", () => {
  console.log("Client released to the pool");
});

pool.on("remove", () => {
  console.log("Client removed from the pool");
});

pool.on("error", () => {
  console.log("==== Error occurre ====");
  console.log(error);
});

// Export the pool

module.exports = pool;
