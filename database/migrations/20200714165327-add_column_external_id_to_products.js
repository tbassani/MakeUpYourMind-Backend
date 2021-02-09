'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn({ tableName: 'products' }, 'external_id', {
      type: Sequelize.INTEGER,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn({ tableName: 'products' }, 'external_id');
  },
};
