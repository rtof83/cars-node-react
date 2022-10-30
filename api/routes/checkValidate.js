const { app } = require('../database/conn');
const checkValidate = (route) => {
  app.post(route, async (req, res) => {
    try {
      const { error, decoded } = require('../middlewares/validate')(req);
      
      if (error) res.status(401).json({ error: 'invalid token' });
      if (decoded) res.status(200).json(decoded);

    } catch (error) {
      return res.status(500).json({ erro: error });
    };
  });
};

module.exports = checkValidate;
