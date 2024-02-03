const express = require("express");

var createError = require('http-errors');

var healthCheck = require('./routes/healthz');

const app = express();

const port = 3000;

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

app.use(express.urlencoded({ extended: true }));

app.use('/healthz', (req, res, next) => {
  if (req.headers["content-type"]) {
    res.status(400).header('Cache-Control', 'no-cache').send('Bad Request');
  }
  req.sequelize = sequelize;
});

app.use('/healthz', healthCheck);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});