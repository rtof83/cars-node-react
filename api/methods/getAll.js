const { app, conn } = require('../database/conn');

const getAll = (route, model) => {
  app.get(route, async (req, res) => {
    let query;
    // custom queries
    if (req.path === '/cars')
      query = `SELECT c.id, c.name, c.model, c.price, c.km, c.image, c.desc, b.name AS brand, s.name AS store
               FROM cars c
               INNER JOIN brands b ON c.brandId = b.id
               INNER JOIN stores s ON c.storeId = s.id
               ORDER BY c.price`;

    try {
      const result = await (query ? conn.query(query, { type: conn.QueryTypes.SELECT }) : model.findAll());

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ erro: error });
    }
  });
};

module.exports = getAll;
