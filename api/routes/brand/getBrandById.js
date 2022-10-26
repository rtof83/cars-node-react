const getBrandById = require('express').Router();
const Brand = require('../../models/brand');

getBrandById.get('/:id', async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);

    if (!brand)
      return res.status(422).json({ message: 'Record not found!' });

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = getBrandById;
