const getCarById = require('express').Router();
const Car = require('../../models/car');

getCarById.get('/:id', async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);

    if (!car)
      return res.status(422).json({ message: 'Record not found!' });

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = getCarById;
