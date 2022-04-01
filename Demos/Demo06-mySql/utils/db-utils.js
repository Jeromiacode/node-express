const mssql = require('mssql');
// const connectionString = process.env.DB_CONNECTIONSTRING;
// qu'on peut placer dans mssql.connect() si on require le dotenv en tout premier dans app.js

/**
 * Créer la connection vers la DB
 * @returns {Promise<mssql.ConnectionPool>}
 */
const createDbConnection = async () => {
  const db = await mssql.connect(process.env.DB_CONNECTIONSTRING);
  return db;
};

const testDbConnection = async () => {
  try {
    const db = await createDbConnection();
    db.close();
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = {
  createDbConnection,
  testDbConnection,
};
