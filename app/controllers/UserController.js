/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/UserModel');
const Profile = require('../../models/ProfilesModel');
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
  async create(req, res, next) {
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        skin_color,
        skin_acne,
        skin_oiliness,
        skin_lines,
      } = req.body;

      console.log(req.body);

      const find_user = await User.findAll({
        where: {
          email,
          deleted_at: null,
        },
      });
      const check_user = find_user[0];

      if (check_user && check_user !== undefined && find_user.length > 0) {
        return res.status(400).send({ error: 'E-mail já cadastrado!' });
      }

      const hash = bcrypt.hashSync(password, 10);
      console.log(first_name);
      const user = await User.create({
        first_name,
        last_name,
        email,
        password: hash,
      });
      const profile = await Profile.create({
        user_id: user.id,
        skin_color_id: skin_color,
        skin_acne_id: skin_acne,
        skin_oiliness_id: skin_oiliness,
        skin_lines_id: skin_lines,
      });

      const newRefreshToken = generateRefreshToken({ id: user.id });

      res.cookie('jid', newRefreshToken, {
        sign: true,
        expires: new Date(Date.now() + authConfig.refresh_cookie_exp),
        httpOnly: true,
      });

      const token = generateToken({ id: user.id });
      res.header('X-Token', token);

      return res.json(user);
    } catch (error) {
      console.error(error);
      next({ error: 'Registration failed' });
    }
  },
  /*
  async update(req, res, next) {
    try {
      const { name } = req.body;
      const { id } = req.params;
      await knex('users')
        .update({
          name,
        })
        .where({ id });
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    const { id } = req.body;

    try {
      await knex('users')
        .where({ id })
        // .del();
        .update('deleted_at', new Date());

      res.send();
    } catch (error) {
      next(error);
    }
  },*/
};
