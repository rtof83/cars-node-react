const deleteBrand = require('express').Router();
const Brand = require('../../models/brand');

deleteBrand.delete('/:id', async (req, res) => {
  const brand = await Brand.findByPk(req.params.id);

  if (!brand)
    return res.status(422).json({ message: 'Record not found!' });

  try {
    await brand.destroy();

    res.status(200).json({ message: 'Record deleted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = deleteBrand;
