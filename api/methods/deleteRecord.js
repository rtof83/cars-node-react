const { app } = require('../database/conn');

const deleteRecord = (route, model) => {
  app.delete(`${route}/:id`, async (req, res) => {
    const result = await model.findByPk(req.params.id);
    
    if (!result)
      return res.status(422).json({ message: 'Record not found!' });

    try {
      await result.destroy();
  
      res.status(200).json({ message: 'Record deleted successfully!' });
    } catch (error) {
      res.status(500).json({ erro: error });
    };
  });
};

module.exports = deleteRecord;
