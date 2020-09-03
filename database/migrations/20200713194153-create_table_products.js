'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      { schema: 'make_up_your_mind', tableName: 'products' },
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        maker: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        img_src: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ref: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        deleted_at: {
          type: Sequelize.DATE,
          // allowNull defaults to true
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable({ schema: 'make_up_your_mind', tableName: 'products' });
  },
};
