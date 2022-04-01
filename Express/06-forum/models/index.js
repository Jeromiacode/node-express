const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    dialect: 'mssql',
    pol: {
      // nombre d'utilisateur en même temps à la ms
      min: 0,
      max: 5,
      // temps max avant liberation de la connection
      idle: 10_000,
      // temps max avant reconnection
      acquire: 30_000,
    },
  }
);

const db = {};

db.sequelize = sequelize;

// Mes tables
// ↓ fonction qui demande sequelize en param
db.Category = require('./category')(sequelize);
db.Message = require('./message')(sequelize);
db.Subject = require('./subject')(sequelize);
// ↓ many to many : donc on créer le modèle de table intermédiaire
db.CategorySubject = require('./category-subject')(sequelize);
db.Member = require('./member')(sequelize);

// Associations : Créer des méthodes par défaut qui héritent des noms qu'on a renseignés ↓
db.Subject.hasMany(db.Message, {
  onDelete: 'NO ACTION',
  onUpdate: 'CASCADE',
  foreignKey: { allowNull: false },
});
db.Message.belongsTo(db.Subject);
db.Category.belongsToMany(db.Subject, { through: db.CategorySubject });
db.Subject.belongsToMany(db.Category, { through: db.CategorySubject });
db.Member.hasMany(db.Subject, {
  onDelete: 'NO ACTION',
  onUpdate: 'CASCADE',
  foreignKey: { allowNull: false },
});
db.Subject.belongsTo(db.Member);
db.Member.hasMany(db.Message, {
  onDelete: 'NO ACTION',
  onUpdate: 'CASCADE',
  foreignKey: { allowNull: false },
});
db.Message.belongsTo(db.Member);
// ↑ Si  to 1 to 1 : .hasOne + .belongsTo

// to : app.js
module.exports = db;
