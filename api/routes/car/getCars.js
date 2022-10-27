const { conn } = require('../../database/conn');
const getCars = require('express').Router();

getCars.get('/', async (_, res) => {
  try {
    const query = `SELECT c.id, c.name, c.model, c.price, c.km, c.image, c.desc, b.name AS brand, s.name AS store
                   FROM cars c
                   INNER JOIN brands b ON c.brandId = b.id
                   INNER JOIN stores s ON c.storeId = s.id
                   ORDER BY c.price`;

    const cars = await conn.query(query, { type: conn.QueryTypes.SELECT });

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = getCars;
