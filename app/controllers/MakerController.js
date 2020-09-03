/* eslint-disable no-undef */
/* eslint-disable consistent-return */

const makers = require('../../models/MakersModel');

module.exports = {
  async get(req, res, next) {
    try {
      const _makers = await makers.findAndCountAll();
      res.header('X-Total-Count', _makers.count);
      res.header('X-Per-Page', 10);
      return res.status(200).json(_makers.rows);
    } catch (error) {
      console.error(error);

      res.status(500).send({ error: 'Get makers failed' });
    }
  },
};
