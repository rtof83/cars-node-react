const { app } = require('../database/conn');

const postRecord = (route, model) => {
  app.post(route, async (req, res) => {
    const result = await model.findOne({ where: { name: req.body.name } });
    
    if (result)
      return res
        .status(419)
        .json({ message: `user '${result.name}' already exists in database` });

    try {
      await model.create(req.body);
  
      res.status(201).json({ message: 'Record inserted successfully!' });
    } catch (error) {
      res.status(500).json({ erro: error });
    };
  });
};

module.exports = postRecord;
