const Sequelize = require('sequelize');
const config = require('./config')
// database connection 
const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
  host: config.database.host,
  dialect: config.database.dialect,
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


// db.sequelize.sync({});
module.exports = db;
