const jwt = require('jsonwebtoken');

JWT_KEY = 'asdf';

module.exports = async (req, res, next) => {
  if (!req.headers['authorization']) {
    console.log(req.header);
    return res.sendStatus(401);
  }
  const token = req.headers['authorization'].split(` `)[1];
  jwt.verify(token, JWT_KEY, (err, payload) => {
    if (err) {
      return res.sendStatus(401);
    } else {
      req.user = payload;
      next();
    }
  });
};
