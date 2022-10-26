const deleteStore = require('express').Router();
const Store = require('../../models/store');

deleteStore.delete('/:id', async (req, res) => {
  const store = await Store.findByPk(req.params.id);

  if (!store)
    return res.status(422).json({ message: 'Record not found!' });

  try {
    await store.destroy();

    res.status(200).json({ message: 'Record deleted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = deleteStore;