const { app } = require('../database/conn');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
// const Auth = require('../models/auth');

const checkUser = (route) => {
  app.post(route, async (req, res) => {
    try {
      const user = await User.findOne({ where: {
        name: req.body.name,
        password: req.body.password
      }});

      if (!user)
        return res.status(401).json({ error: 'user or password invalid' });
  
      const token = jwt.sign({ id: user.id, access: user.access },
                               process.env.SECRET,
                             { expiresIn: process.env.SECRET_TIMEOUT });

      // await Auth.create({ id: user.id, name: user.name, token: token });

      return res.json({ auth: true, id: user.id, name: user.name, access: user.access, token });
    } catch (error) {
      res.status(500).json({ erro: error });
    };
  });
};

module.exports = checkUser;