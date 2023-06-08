/*
 * Query to create companies table in the public schema
 */
-- CREATE TABLE companies(
--     id serial PRIMARY KEY,
--     name varchar(250) NOT NULL,
--     email varchar(250),
--     owner int not null REFERENCES users(id) on DELETE RESTRICT,
--     schema_name varchar(250) not null unique,
--     status status_types NOT NULL,
--     created_at timestamp DEFAULT CURRENT_TIMESTAMP
-- )