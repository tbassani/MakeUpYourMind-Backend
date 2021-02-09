'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'skin_color' }, [
      {
        description: 'Pálida',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Muito branca',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Branca',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Levemente morena',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Morena',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Negra',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'skin_color' }, null, {});
  },
};
