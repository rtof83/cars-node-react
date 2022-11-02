const { app } = require('../database/conn');
const checkUser = require('../middlewares/checkUser');

const getAll = (route, model) => {
  app.get(route, checkUser, async (req, res) => {
    let result;

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

        result = await model.findAll({ limit: pageSize, offset: startFrom, where: search}, { order: [['name']] });

        // adding pagination to array
        if (result.length > 0)
          result.push({ page: parseInt(pageNumber), from: pages });
      } else {
        // GET ALL
        result = await model.findAll();
      };

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });
};

module.exports = getAll;
