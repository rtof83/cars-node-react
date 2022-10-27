const postCar = require('express').Router();
const Car = require('../../models/car');

postCar.post('/', async (req, res) => {
  const car = await Car.findOne({ where: { name: req.body.name } });

  if (car)
    return res
      .status(419)
      .json({ message: `car '${car.name}' already exists in database` });

  try {
    await Car.create(req.body);

    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = postCar;
