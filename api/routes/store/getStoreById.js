const getStoreById = require('express').Router();
const Store = require('../../models/store');

getStoreById.get('/:id', async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);

    if (!store)
      return res.status(422).json({ message: 'Record not found!' });

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = getStoreById;
