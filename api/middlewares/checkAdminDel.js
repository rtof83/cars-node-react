const User = require('../models/user');

const checkAdminDel = async (req, res, next) => {
  const Sequelize = require('sequelize');
  const Op = Sequelize.Op;

  const path = req.path.substring(0, req.path.search('/'+req.params.id));
  
  if (path === '/users') {
    const admins = await User.count({ where: { id: { [Op.ne]: req.params.id }, access: 'admin' }});

    if (!admins)
      return res.status(422).json({ message: 'Must exists at least one admin at database!' });
  };

  next();
};

module.exports = checkAdminDel;
