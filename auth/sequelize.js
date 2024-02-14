const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',// e.g., 'localhost'
  port: 5432,// default PostgreSQL port
  username: 'postgres',
  password: 'root',
  database: 'cloudassignmentdatabase',
  define: {
    timestamps: false,// Disable timestamps by default
  },
});

module.exports = sequelize;