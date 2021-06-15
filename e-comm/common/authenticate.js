const jwt = require('jsonwebtoken');

JWT_KEY = 'asdf';

export const authenticate = async (req, res, next) => {
  const token = req.header['authorization'].split(` `)[1];
  jwt.verify(token, JWT_KEY, (err, payload) => {
    if (err) {
      return res.sendStatus(401);
    } else {
      req.user = payload;
      next();
    }
  });
};
