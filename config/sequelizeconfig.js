const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pranavdhongade',
  password: 'root',
  database: 'cloudAssignmentDatabase',
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;