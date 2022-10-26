const getStores = require('express').Router();
const Store = require('../../models/store');

getStores.get('/', async (_, res) => {
  try {
    const stores = await Store.findAll();

    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = getStores;
