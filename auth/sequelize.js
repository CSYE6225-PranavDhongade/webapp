const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',// e.g., 'localhost'
  port: 5432,// default PostgreSQL port
  username: 'pranavdhongade',
  password: 'root',
  database: 'cloudAssignmentDatabase',
  define: {
    timestamps: false,// Disable timestamps by default
  },
});

module.exports = sequelize;