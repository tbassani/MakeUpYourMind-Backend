'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn({ schema: 'make_up_your_mind', tableName: 'products' }, 'get_new_by', {
      type: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      { schema: 'make_up_your_mind', tableName: 'products' },
      'get_new_by'
    );
  },
};
