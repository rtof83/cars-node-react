const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Brand = conn.define('brand', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Brand;
