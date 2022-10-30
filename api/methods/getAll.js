const { app, conn } = require('../database/conn');
const checkUser = require('../middlewares/checkUser');

const getAll = (route, model) => {
  app.get(route, checkUser, async (req, res) => {
    let query, result;

    // custom queries
    if (route === '/cars')
      query = `SELECT c.id, c.name, c.model, c.price, c.km, c.image, c.desc, b.name AS brand, s.name AS store
               FROM cars c
               INNER JOIN brands b ON c.brandId = b.id
               INNER JOIN stores s ON c.storeId = s.id`;
    // custom queries

    try {
      if (req.query.page || req.query.name) {
        let search = {};

        if (req.query.name) {
          const Sequelize = require('sequelize');
          const Op = Sequelize.Op;

          search.name = { [Op.substring]: req.query.name };
        };

        const pageSize = parseInt(process.env.PAGE_SIZE);
        const total = await model.count({ where: search });
        const pages = Math.ceil(total / pageSize);
        const pageNumber = !req.query.page ? 1 : req.query.page;
        const startFrom = (pageNumber - 1) * pageSize;

        if (route === '/cars' && req.query.name)
          query += ` WHERE c.name LIKE :search
                     ORDER BY c.price
                     LIMIT :startFrom, :pageSize`;
        else if (route === '/cars')
          query += ` ORDER BY c.price
                     LIMIT :startFrom, :pageSize`;

        result = await (query ? conn.query(query, { replacements: {
                          startFrom: startFrom,
                          pageSize: pageSize,
                          search: `%${req.query.name}%`
                          }, type: conn.QueryTypes.SELECT })
                        :
                        model.findAll({ limit: pageSize, offset: startFrom, where: search},
                                      { order: [['name']] },
                                      ));

        // adding pagination to array
        if (result.length > 0)
          result.push({ page: parseInt(pageNumber), from: pages });
      } else {
        // GET ALL
        result = await (query ? conn.query(query, { type: conn.QueryTypes.SELECT }) : model.findAll());
      };

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
};

module.exports = getAll;
