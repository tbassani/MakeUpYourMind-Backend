module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn({ schema: 'make_up_your_mind', tableName: 'products' }, 'category', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn({ schema: 'make_up_your_mind', tableName: 'products' }, 'category');
  },
};
