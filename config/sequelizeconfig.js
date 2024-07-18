const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')
const path = require('path');

// Load environment variables from the .env file located in the config directory
const result = dotenv.config({ path: path.resolve(__dirname, '.env') });

if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('.env file loaded successfully from config folder');
}

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;

console.log('dbHost' + dbHost);
console.log('dbUser' + dbUser);
console.log('dbPass' + dbPass);
console.log('dbName' + dbName);
console.log('dbPort' + dbPort);

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