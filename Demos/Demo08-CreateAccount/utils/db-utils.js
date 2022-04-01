const mssql = require('mssql');


const createDbConnection = async () => {
    const db = await mssql.connect(process.env.DB_CONNECTIONSTRING);
    return db;
};

const testDbConnection = async () => {
    try {
      const db = await createDbConnection();
      db.close();
      console.log("Connecté à la DB");
    } catch (error) {
      console.log(error);
      process.exit();
    }
  };
  

module.exports = {
    createDbConnection,
    testDbConnection
};