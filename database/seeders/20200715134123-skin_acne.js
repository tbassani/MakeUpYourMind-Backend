'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'skin_acne' }, [
      {
        description: 'Nenhuma',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Pouca',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Razoável',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Muita',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'skin_acne' }, null, {});
  },
};
