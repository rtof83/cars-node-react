const getCars = require('./car/getCars');
const getCarById = require('./car/getCarById');
const postCar = require('./car/postCar');
const updateCar = require('./car/updateCar');
const deleteCar = require('./car/deleteCar');

module.exports = [ getCars,
                   getCarById,
                   postCar,
                   updateCar,
                   deleteCar ];
