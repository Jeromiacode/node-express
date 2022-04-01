const { DataTypes, Sequelize } = require('sequelize');

/**
 * Représentation du model Message
 * @param {Sequelize} sequelize
 * @returns
 */

module.exports = (sequelize) => {
  const Message = sequelize.define(
    'Message',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
    },
    {
      tableName: 'subjectMessage',
    }
  );
  return Message;
};
