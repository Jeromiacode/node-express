const { DataTypes, Sequelize } = require('sequelize');

/**
 * Représentation du model Category
 * @param {Sequelize} sequelize
 * @returns
 */

module.exports = (sequelize) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // Ajoute la contrainte Unique
        unique: {
          name: 'UK_Categories__Name',
        },
      },
    },
    {
      tableName: 'category',
      timestamps: false,
      // Si le unique ne marche pas ↑
      // indexes:  'UK__Categories__Name',
    }
  );

  return Category;
};
