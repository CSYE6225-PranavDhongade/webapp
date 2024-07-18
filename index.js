const express = require("express");

var createError = require('http-errors');

var healthCheck = require('./routes/healthz');

var usersRouter = require('./routes/userroute');

var pubsubRouter = require('./routes/pubsubroute');

const app = express();

const port = 3000;

const sequelize = require('./config/sequelizeconfig');

const userModel = require('./models/user');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// const logger = require('./routes/logger');

// Run migrations on server startup
async function runMigrations() {
  //we need to define the User model first
  try {
    await sequelize.authenticate();
    // logger.info('Connection to the database has been established successfully.');
    console.log('Connection to the database has been established successfully.');
    await userModel.sync({ alter: true }); // This will apply any pending migrations
    console.log('Database synchronized successfully.');
    // logger.info('Database synchronized successfully.');
    // logger.info("200 ok response successful");
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    // logger.error(" 503 service unavailable");
    // logger.info('Unable to connect to the database:');
  }
}

// Start the server after running migrations
runMigrations().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});

app.use('/healthz', (req, res, next) => {
  if (req.headers["content-type"]) {
    // logger.error("400 bad request") ;
    res.status(400).header('Cache-Control', 'no-cache').send('Bad Request');
  }

  req.sequelize = sequelize;
  
  res.status(200).header('Cache-Control', 'no-cache').send('Health Check OK');
});

app.use('/users', usersRouter);

module.exports = {app, runMigrations}