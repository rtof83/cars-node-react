const updateCar = require('express').Router();
const Car = require('../../models/car');

updateCar.put('/:id', async (req, res) => {
  const car = await Car.findByPk(req.params.id);

  if (!car)
    return res.status(422).json({ message: 'Record not found!' });

  try {
    await car.update(req.body);

    res.status(200).json({ message: 'Record updated successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = updateCar;
