const postStore = require('express').Router();
const Store = require('../../models/store');

postStore.post('/', async (req, res) => {
  const store = await Store.findOne({ where: { name: req.body.name } });

  if (store)
    return res
      .status(419)
      .json({ message: `store '${store.name}' already exists in database` });

  try {
    await Store.create(req.body);

    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = postStore;
