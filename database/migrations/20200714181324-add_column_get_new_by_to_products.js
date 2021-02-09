'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn({ tableName: 'products' }, 'get_new_by', {
      type: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn({ tableName: 'products' }, 'get_new_by');
  },
};
