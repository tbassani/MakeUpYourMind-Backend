'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ schema: 'make_up_your_mind', tableName: 'skin_lines' }, [
      {
        description: 'Nenhuma',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Poucas',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Razoável',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Muitas',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      { schema: 'make_up_your_mind', tableName: 'skin_lines' },
      null,
      {}
    );
  },
};
