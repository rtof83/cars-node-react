const { app } = require('../database/conn');

const putRecord = (route, model) => {
  app.put(`${route}/:id`, async (req, res) => {
    const result = await model.findByPk(req.params.id);
    
    if (!result)
      return res.status(422).json({ message: 'Record not found!' });

    try {
      await result.update(req.body);

      res.status(200).json({ message: 'Record updated successfully!' });
    } catch (error) {
      res.status(500).json({ erro: error });
    };
  });
};

module.exports = putRecord;
