const { DataTypes, Sequelize } = require('sequelize');

/**
 * Représentation du model Subject
 * @param {Sequelize} sequelize
 * @returns
 */

module.exports = (sequelize) => {
  const Subject = sequelize.define('Subject', {
    name: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    }
  },
  {
    tableName: 'subject',
  });
  return Subject;
};
