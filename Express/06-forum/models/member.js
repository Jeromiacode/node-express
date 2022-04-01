const { DataTypes, Sequelize } = require('sequelize');

/**
 * Représentation du model Subject
 * @param {Sequelize} sequelize
 * @returns
 */
module.exports = (sequelize) => {
  const Member = sequelize.define(
    // Le nom influence la métode qui est générée automatiquement dans la db
    'member',
    {
      pseudo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: {
          name: 'UK_member__Pseudo',
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
          name: 'UK_member__Email',
        },
      },
      password: {
        // Car bcrypt fait une string de 60 (clé + salt + pepper)
        type: DataTypes.CHAR(60),
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        //  ↓ Si alter table, toujours mieux
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
    }
  );
  return Member;
};
