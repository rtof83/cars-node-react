const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Store = conn.define('store', {
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

module.exports = Store;
