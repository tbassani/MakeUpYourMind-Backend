/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/UserModel');
const authConfig = require('../../config/auth');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: authConfig.token_exp,
  });
}

function generateRefreshToken(params = {}) {
  return jwt.sign(params, authConfig.refresh_secret, {
    expiresIn: authConfig.refresh_token_exp,
  });
}

module.exports = {
  async authenticate(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findAll({
        where: {
          email,
          deleted_at: null,
        },
      });
      const login_user = user[0];

      if (!login_user || login_user === undefined || user.length === 0) {
        return res.status(400).send({ error: 'User not found' });
      }

      if (!(await bcrypt.compare(password, login_user.password))) {
        console.log('400-----------------------------------');
        return res.status(400).send({ error: 'Invalid password' });
      }
      console.log(req.cookies.jid);
      if (!req.cookies.jid) {
        console.log('no cookie');
        const newRefreshToken = generateRefreshToken({ id: login_user.id });

        res.cookie('jid', newRefreshToken, {
          sign: true,
          expires: new Date(Date.now() + authConfig.refresh_cookie_exp),
          httpOnly: true,
        });
      }
      const token = generateToken({ id: login_user.id });
      res.header('X-Token', token);
      res.send({
        login_user,
      });
    } catch (error) {
      next(error);
    }
  },

  async checkToken(req, res, next) {
    const { token } = req.body;
    const refreshCookie = req.cookies.jid;
    console.log({ refreshCookie });
    res.header('Access-Control-Allow-Credentials', true);
    try {
      jwt.verify(token, authConfig.secret, (error, decodedJWT) => {
        if (error) {
          jwt.verify(refreshCookie, authConfig.refresh_secret, (err, decoded) => {
            if (err) {
              res.status(401).send({ error: 'Invalid refresh Token' });
            } else {
              const newToken = generateToken({ id: decoded.id });
              res.header('X-Token', newToken);
              res.status(200).send();
            }
          });
        } else {
          res.status(200).send();
        }
      });
    } catch (error) {
      res.status(401).send({ error: 'Could not validate Token' });
    }
  },

  async logout(req, res, next) {
    console.log('LOGOUT');
    const { token } = req.body;
    try {
      res.clearCookie('jid').status(200).send();
    } catch (error) {
      res.status(401).send({ error: 'Could not validate Token' });
    }
  },
};
