const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Brand = require('./brand');
const Store = require('./store');

const Car = conn.define('car', {
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
    model: Sequelize.INTEGER,
    price: Sequelize.DECIMAL,
    km: Sequelize.INTEGER,
    desc: Sequelize.STRING,
    image: Sequelize.STRING
});

Car.belongsTo(Brand, {
    constraint: true,
    foreignKey: 'brandId'
});

Car.belongsTo(Store, {
    constraint: true,
    foreignKey: 'storeId'
});

module.exports = Car;
