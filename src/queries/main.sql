-- CREATE DATABASE pps
-- --
-- --
-- -- Custom gender data type
-- CREATE type gender_types AS ENUM('Male', 'Female');
-- --
-- --
-- CREATE type status_types AS ENUM('Active', 'Inactive');
-- --
-- -- Create users table
-- CREATE TABLE users (
--     id Serial PRIMARY KEY,
--     full_name varchar(250) NOT NULL,
--     email varchar(250) NOT NULL unique,
--     password varchar(250) NOT NULL,
--     gender gender_types NOT NULL,
--     role varchar(250) not null,
--     status status_types NOT NULL,
--     schema_name varchar(250),
--     created_at timestamp DEFAULT CURRENT_TIMESTAMP
-- )
-- ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE(email)
-- ALTER TABLE users RENAME COLUMN tenant_name to schema_name
DROP SCHEMA hiluf CASCADE