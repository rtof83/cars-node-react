const postBrand = require('express').Router();
const Brand = require('../../models/brand');

postBrand.post('/', async (req, res) => {
  const brand = await Brand.findOne({ where: { name: req.body.name } });

  if (brand)
    return res
      .status(419)
      .json({ message: `brand '${brand.name}' already exists in database` });

  try {
    await Brand.create(req.body);

    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = postBrand;
