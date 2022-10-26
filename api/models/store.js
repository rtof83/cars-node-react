const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Store = conn.define('store', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    local: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Store;
