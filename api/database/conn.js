const Sequelize = require('sequelize');
const express = require('express');
const app = express();

const DB_NAME = '';
const DB_USER = '';
const DB_PASS = '';

const DB_HOST = 'localhost';
const DB_PORT = 3306;

const conn = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    dialect: 'mysql',
    host: DB_HOST,
    port: DB_PORT
});

(async () => {
    await conn.sync();
})();

conn
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(3001);
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

module.exports = { app, conn };
