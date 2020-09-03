/* eslint-disable no-undef */
/* eslint-disable consistent-return */

const categories = require('../../models/CategoriesModel');

module.exports = {
  async get(req, res, next) {
    try {
      const _categories = await categories.findAndCountAll();
      res.header('X-Total-Count', _categories.count);
      res.header('X-Per-Page', 10);
      return res.status(200).json(_categories.rows);
    } catch (error) {
      console.error(error);

      res.status(500).send({ error: 'Get categories failed' });
    }
  },
};
