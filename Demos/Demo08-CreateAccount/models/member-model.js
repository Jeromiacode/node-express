const mssql = require('mssql');
const { createDbConnection } = require('../utils/db-utils');
const { memberMapper } = require('./mappers/member-mapper');

const memberModel = {

    // TODO Add rest of CRUD Method

    insert: async ({ email, pseudo, passwordHash }) => {
        let db;
        try {
            db = await createDbConnection();

            const querySQL = 'INSERT INTO Member (Email, Pseudo, Password)'
                + ' OUTPUT inserted.MemberId'
                + ' VALUES (@email, @pseudo, @pwd)';

            const request = new mssql.PreparedStatement(db);
            request.input('email', mssql.VarChar(250));
            request.input('pseudo', mssql.VarChar(50));
            request.input('pwd', mssql.Char(60));

            await request.prepare(querySQL);

            const result = await request.execute({
                'email': email,
                'pseudo': pseudo,
                'pwd': passwordHash
            });

            await request.unprepare();

            return result.recordset[0]['MemberId'];
        }
        finally {
            db?.close();
        }
    },

    getByEmail: async (email) => {
        let db;
        try {
            db = await createDbConnection();

            const querySQL = "SELECT * FROM Member WHERE Email LIKE @email";

            const request = new mssql.PreparedStatement(db);
            request.input('email', mssql.VarChar(250));

            await request.prepare(querySQL);

            const result = await request.execute({
                'email': email
            });

            await request.unprepare();

            if (result.recordset.length !== 1) {
                return null;
            }
            return memberMapper(result.recordset[0]);
        }
        finally {
            db?.close();
        }
    }

};

module.exports = memberModel;