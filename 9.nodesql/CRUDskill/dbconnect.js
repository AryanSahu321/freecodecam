import oracledb from "oracledb";

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
  poolMin: 2,
  poolMax: 10,
  poolIncrement: 2,
};
// Initialize pool once when app starts
export async function initPool() {
  await oracledb.createPool(dbConfig);
}
// Optimized runQuery using the pool
export async function runQuery(sql, binds = {}) {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(sql, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT, // returns rows as clean objects
      autoCommit: true,
      // Oracle requires autoCommit: true for UPDATE, INSERT, and DELETE queries
      //otherwise the change is held in a temporary transaction and discarded when the connection closes.
    });
    return result.rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close(); // returns connection back to pool instantly
      } catch (err) {
        console.error(err);
      }
    }
  }
}
// 2. Example usage
async function testRunner() {
  try {
    const rows = await runQuery(
      `SELECT sys_context('USERENV', 'DB_NAME') AS db FROM dual`,
    );
    console.log("Query Result:", rows);
  } catch (err) {
    console.log("Failed to run query.");
  }
}

//testRunner();
