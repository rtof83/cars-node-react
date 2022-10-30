const { app, conn } = require('../database/conn');
const checkUser = require('../middlewares/checkUser');

const getAll = (route, model) => {
  let query;

  // custom queries
  if (route === '/cars')
    query = `SELECT c.id, c.name, c.model, c.price, c.km, c.image, c.desc, b.name AS brand, s.name AS store
            FROM cars c
            INNER JOIN brands b ON c.brandId = b.id
            INNER JOIN stores s ON c.storeId = s.id
            ORDER BY c.price
            LIMIT :startFrom, :pageSize`;

  app.get(route, checkUser, async (req, res) => {
    try {
      const pageSize = 3;
      const total = await model.count();
      const pages = Math.ceil(total / pageSize);
      const pageNumber = !req.query.page ? 1 : req.query.page;
      const startFrom = (pageNumber - 1) * pageSize;

      const result = await (query ? conn.query(query, { replacements: {
                              startFrom: startFrom,
                              pageSize: pageSize
                              }, type: conn.QueryTypes.SELECT })
                            :
                            model.findAll({ limit: pageSize, offset: startFrom }, {order: [['name']]}));

      // adding pagination to array
      result.push({ page: parseInt(pageNumber), from: pages });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
};

module.exports = getAll;
