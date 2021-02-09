/* eslint-disable no-undef */
/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');

const product_rating = require('../../models/ProductRatingModel');
const users = require('../../models/UserModel');

const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const Products = require('../../models/ProductModel');

module.exports = {
  async get(req, res, next) {
    try {
      const { product_id } = req.params;

      const user_rating = await users.findByPk(req.user_id, {
        include: {
          association: 'user_ratings',
          where: {
            product_id: product_id,
          },
        },
      });
      console.log('USER RATING------------------------------');
      const user_profile = await users.findByPk(req.user_id, {
        include: { association: 'user_profile' },
      });
      var profile = user_profile.user_profile.dataValues;
      profile.product_id = product_id;
      profile = {
        skin_color_id: profile.skin_color_id,
        skin_oiliness_id: profile.skin_oiliness_id,
        skin_acne_id: profile.skin_acne_id,
        skin_lines_id: profile.skin_lines_id,
        user_id: profile.user_id,
        product_id: profile.product_id,
      };
      var rating = await Products.findAndCountAll({
        attributes: [
          'id',
          'name',
          'maker',
          'price',
          'img_src',
          'ref',
          [Sequelize.fn('SUM', Sequelize.col('ratings.rating')), 'totalRating'],
          [Sequelize.fn('COUNT', Sequelize.col('ratings.rating')), 'ratingAmount'],
        ],
        include: [
          {
            association: 'ratings',
            attributes: [],
            where: {
              skin_color_id: profile.skin_color_id,
              skin_acne_id: profile.skin_acne_id,
              skin_lines_id: profile.skin_lines_id,
              skin_oiliness_id: profile.skin_oiliness_id,
            },
          },
        ],
        group: ['id'],
        where: {
          id: product_id,
        },
      });
      console.log(rating.rows);
      if (rating.rows.length === 0) {
        rating = await Products.findAndCountAll({
          attributes: ['id', 'name', 'maker', 'price', 'img_src', 'ref'],

          where: {
            id: product_id,
          },
        });
      }

      if (!user_rating) {
        return res.json(rating.rows);
      } else {
        res.status(403).json(rating.rows);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Get rating failed' });
    }
  },
  async create(req, res, next) {
    try {
      console.log('CREATE EVALUATION');
      const { product_id } = req.params;
      const { user_rating } = req.body;
      const user_profile = await users.findByPk(req.user_id, {
        include: { association: 'user_profile' },
      });
      var profile = user_profile.user_profile.dataValues;
      if (profile && profile.user_id) {
        profile.product_id = product_id;
        profile = {
          skin_color_id: profile.skin_color_id,
          skin_oiliness_id: profile.skin_oiliness_id,
          skin_acne_id: profile.skin_acne_id,
          skin_lines_id: profile.skin_lines_id,
          user_id: profile.user_id,
          product_id: profile.product_id,
        };
        console.log(product_id);

        const new_rating = await product_rating.create({
          rating: user_rating,
          skin_color_id: profile.skin_color_id,
          skin_oiliness_id: profile.skin_oiliness_id,
          skin_acne_id: profile.skin_acne_id,
          skin_lines_id: profile.skin_lines_id,
          user_id: profile.user_id,
          product_id: profile.product_id,
        });

        return res.status(201).json(new_rating);
      } else {
        return res.status(403).send({ error: 'User does not have a profile' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Create rating failed' });
    }
  },

  async delete(req, res, next) {
    try {
      const { product_id } = req.params;

      const destroyed_rating = await product_rating.destroy({
        where: { user_id: req.user_id, product_id },
      });

      return res.status(200).json(destroyed_rating);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Delete rating failed' });
    }
  },
};
