const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbPort = process.env.PORT;

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: dbHost,
  port: dbPort,
  username: dbUser,
  password: dbPass,
  database: dbName,
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;