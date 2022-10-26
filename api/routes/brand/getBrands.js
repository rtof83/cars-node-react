const getBrands = require('express').Router();
const Brand = require('../../models/brand');

getBrands.get('/', async (_, res) => {
  try {
    const brands = await Brand.findAll();

    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = getBrands;
