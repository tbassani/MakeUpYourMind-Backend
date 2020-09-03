/* eslint-disable no-undef */
/* eslint-disable consistent-return */

const profiles = require('../../models/ProfilesModel');
const users = require('../../models/UserModel');
const ratings = require('../../models/ProductRatingModel');
const skinColor = require('../../models/SkinColorModel');
const skinAcne = require('../../models/SkinAcneModel');
const skinLines = require('../../models/SkinLinesModel');
const skinOiliness = require('../../models/SkinOilinessModel');

module.exports = {
  async getProfiles(req, res, next) {
    try {
      var profiles = {};
      profiles.skin_color = await skinColor.findAll({});
      profiles.skin_acne = await skinAcne.findAll({});
      profiles.skin_lines = await skinLines.findAll({});
      profiles.skin_oiliness = await skinOiliness.findAll({});

      return res.json(profiles);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Get profiles failed' });
    }
  },
  async getUserProfile(req, res, next) {
    try {
      const user_profile = await users.findByPk(req.user_id, {
        include: { association: 'user_profile' },
      });
      return res.json(user_profile);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Get profile failed' });
    }
  },
  async create(req, res, next) {
    try {
      const { skin_color, skin_acne, skin_oiliness, skin_lines } = req.body;

      const new_profile = await profiles.create({
        skin_color_id: skin_color,
        skin_acne_id: skin_acne,
        skin_oiliness_id: skin_oiliness,
        skin_lines_id: skin_lines,
        user_id: req.user_id,
      });

      return res.json(new_profile);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Create profile failed' });
    }
  },

  async update(req, res, next) {
    try {
      console.log('--------------------------------------------------------------------------');
      const curr_profile = await users.findByPk(req.user_id, {
        include: { association: 'user_profile' },
      });

      var profile = curr_profile.user_profile.dataValues;
      profile = {
        skin_color_id: profile.skin_color_id,
        skin_oiliness_id: profile.skin_oiliness_id,
        skin_acne_id: profile.skin_acne_id,
        skin_lines_id: profile.skin_lines_id,
      };
      const { skin_color, skin_acne, skin_oiliness, skin_lines } = req.body;

      const updated_profile = await profiles.update(
        {
          skin_color_id: skin_color,
          skin_acne_id: skin_acne,
          skin_oiliness_id: skin_oiliness,
          skin_lines_id: skin_lines,
        },
        { where: { user_id: req.user_id } }
      );
      if (
        profile.skin_color_id !== skin_color ||
        profile.skin_acne_id !== skin_acne ||
        profile.skin_oiliness_id !== skin_oiliness ||
        profile.skin_lines_id !== skin_lines
      ) {
        ratings.destroy({ where: { user_id: req.user_id } });
      }

      return res.status(200).json(updated_profile);
    } catch (error) {
      res.status(500).send({ error: 'Update profile failed' });
    }
  },
  /*
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
