const { app, conn } = require('../database/conn');

app.get('/search/:table', async (req, res) => {

  // first index = all tables
  let query = ['SELECT COUNT(*) as count '];

  let result, alias;

  // custom query
  if (req.params.table === 'cars') {
    query[1] = 'SELECT c.id, c.name, c.model, c.price, c.km, c.image, c.desc, b.name AS brand, s.name AS store '
    query[2] = `FROM cars c
                INNER JOIN brands b ON c.brandId = b.id
                INNER JOIN stores s ON c.storeId = s.id `;
    query[3] = '';
    query[4] = 'ORDER BY c.price ';

    alias = 'c';
  } else {
    return res.status(401).json({ error: 'query is missing...' });
  };
  // custom query

  try {
    if (Object.keys(req.query).length) {
      const Sequelize = require('sequelize');
      const Op = Sequelize.Op;

      // mounting WHERE clause (if exists)
      Object.keys(req.query).forEach((key, index, array) => {
        if (key !== 'page') {
          if (query[3] === '') query[3] = 'WHERE ';

          if (key === 'name')
            query[3] += `${alias}.name LIKE '%${req.query[key]}%' `;
          else
            query[3] += `${alias}.${key} = ${req.query[key]} `;

          if (index < array.length-1) query[3] += 'AND ';
        };
      });

      // after ORDER BY clause
      query[5] = 'LIMIT :startFrom, :pageSize';

      let mountQueryCount = query[0] + query[2] + query[3];
      let mountQuery = query[1];
      for (let i = 2; i < query.length; i++) {
        mountQuery += query[i];
      };

      const total = await conn.query(mountQueryCount, { type: conn.QueryTypes.SELECT });
      const pageSize = parseInt(process.env.PAGE_SIZE);
      const pages = Math.ceil(total[0].count / pageSize);
      const pageNumber = !req.query.page ? 1 : req.query.page;
      const startFrom = (pageNumber - 1) * pageSize;

      result = await conn.query(mountQuery, { replacements: {
                        startFrom: startFrom,
                        pageSize: pageSize
                        }, type: conn.QueryTypes.SELECT });

      // adding pagination to array
      if (result.length > 0)
        result.push({ page: parseInt(pageNumber), from: pages });
    } else {
      // GET ALL
      result = await conn.query(query[1] + query[2] + query[4],
                                { type: conn.QueryTypes.SELECT });
    };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = app;
