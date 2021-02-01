/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: authConfig.token_exp,
  });
}

module.exports = (req, res, next) => {
  console.log('MIDDLEWARE BEGIN ----------------------------------------------------------------');

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided' });
  }
  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    res.status(401).send({ error: 'No token error' });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).send({ error: 'Token malformated' });
  }

  const refreshCookie = req.cookies.jid;
  console.log({ refreshCookie });

  jwt.verify(refreshCookie, authConfig.refresh_secret, (err, decoded) => {
    if (err) {
      console.log('Invalid Refresh token');
      return res.status(401).send({ error: 'Invalid refresh Token' });
    } else {
      jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
          console.log('Token not OK');
          if (req.user_id) {
            console.log('Refresh Token OK');
            res.header('X-Token', generateToken({ id: req.user_id }));
            return res.status(200).send();
          }
          console.log('Refresh Token not OK');
          return res.status(401).send({ error: 'Invalid token' });
        }
        console.log('JWT OK');

        return next();
      });
    }
    console.log(decoded);
    req.user_id = decoded.id;
  });
};
