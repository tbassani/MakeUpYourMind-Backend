module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn({ tableName: 'products' }, 'category', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn({ tableName: 'products' }, 'category');
  },
};
