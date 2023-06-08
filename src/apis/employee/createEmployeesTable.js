/**
 * database layer for employee data
 */

const createEmployeesTable = async (dbConnectionClient) => {
  try {
    await dbConnectionClient.query({
      name: "createEmployeeTable",
      text: `CREATE TABLE employees(
                        id serial PRIMARY KEY,
                        full_name varchar(250),
                        email varchar(250),
                        password varchar(250) not null,
                        status public.status_types not null,
                        role varchar(250),
                        schema_name varchar(250) not null,
                        create_at timestamp DEFAULT CURRENT_TIMESTAMP
                    )`,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// export
module.exports = createEmployeesTable;
