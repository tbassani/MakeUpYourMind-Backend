'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      { schema: 'make_up_your_mind', tableName: 'products' },
      'external_id',
      { type: Sequelize.INTEGER, unique: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      { schema: 'make_up_your_mind', tableName: 'products' },
      'external_id'
    );
  },
};
