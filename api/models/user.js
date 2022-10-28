const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const User = conn.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    access: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;
