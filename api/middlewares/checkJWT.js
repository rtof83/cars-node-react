const jwt = require('jsonwebtoken');

const checkJWT = (req, res, next) => {
  const headers = req.headers['authorization'];
  const token = headers && headers.split(' ')[1];

  if (!token)
    return res.status(401).json({ error: 'forbidden access' });

  try {
    jwt.verify(token, process.env.SECRET, (_, decoded) => {
      if (decoded.access !== 'admin' && req.method !== 'GET')
        return res.status(401).json({ error: 'access only for admin' });
      else
        next();
    });   
  } catch(error) {
    res.status(400).json({ error: 'invalid token' });
  };
};

module.exports = checkJWT;
