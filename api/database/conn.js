const Sequelize = require('sequelize');
const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json());

const conn = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

(async () => {
    await conn.sync();
})();

conn
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(process.env.APP_PORT);
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

module.exports = { app, conn };
