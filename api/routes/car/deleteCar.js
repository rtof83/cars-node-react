const deleteCar = require('express').Router();
const Car = require('../../models/car');

deleteCar.delete('/:id', async (req, res) => {
  const car = await Car.findByPk(req.params.id);

  if (!car)
    return res.status(422).json({ message: 'Record not found!' });

  try {
    await car.destroy();

    res.status(200).json({ message: 'Record deleted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = deleteCar;
