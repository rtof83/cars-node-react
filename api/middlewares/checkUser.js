const validate = require('./validate');

const checkUser = async (req, res, next) => {
  if (req.path === '/users') {
    const { error, decoded } = validate(req);

    if (error)
      return res.status(401).json(error);
    else if (decoded.access !== 'admin')
      return res.redirect(`users/${decoded.id}`);
  };

  next();
};

module.exports = checkUser;
