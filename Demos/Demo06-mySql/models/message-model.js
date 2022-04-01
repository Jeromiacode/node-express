const mssql = require("mssql");
const { createDbConnection } = require("../utils/db-utils");

const messageModel = {
  getAll: async () => {
    const db = await createDbConnection();
    const result = await db.query(
      "SELECT * FROM Message ORDER BY CreateDate DESC"
    );
    db.close();
    return result.recordset;
  },

  insert: async ({ pseudo, content }) => {
    let db;
    try {
      db = await createDbConnection();
      const querySql =
        "INSERT INTO Message (Pseudo, Content)" +
        " OUTPUT inserted.MessageId" +
        // surtout ne pas concaténer les valeurs sinon on créer des failles sql
        " VALUES (@pseudo, @content)";

      // Pour éviter l'injection Sql
      const request = new mssql.Request();
      request.input("pseudo", mssql.NVarChar, pseudo);
      request.input("content", mssql.NVarChar, content);
      //

      const result = await request.query(querySql);
      return result.recordset[0].MessageId;
        // return result.recordset[0]['MessageId'];
    } finally {
      db?.close(); // if(db) {db.close()})
    }
  },
};

module.exports = messageModel;
