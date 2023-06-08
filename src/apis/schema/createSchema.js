/**
 * excute query to create schema
 */
const createSchema = async (dbConnectionClient, schema_name) => {
  try {
    // create schema
    await dbConnectionClient.query({
      name: "createSchema",
      text: `create schema ${schema_name}`,
    });

    // switch schema to the newly created schema
    await dbConnectionClient.query({
      name: "switchSchema",
      text: `set search_path to ${schema_name}`,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// export
module.exports = createSchema;
