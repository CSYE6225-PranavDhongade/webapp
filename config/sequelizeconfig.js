const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'cloudassignmentdatabase',
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;