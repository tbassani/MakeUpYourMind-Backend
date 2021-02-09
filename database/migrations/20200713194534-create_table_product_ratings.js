'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      { tableName: 'product_ratings' },
      {
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'products', key: 'id' },
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          primaryKey: true,
        },
        skin_color_id: {
          type: Sequelize.INTEGER,
          references: { model: 'skin_color', key: 'id' },
          onDelete: 'CASCADE',
          allowNull: true,
        },
        skin_oiliness_id: {
          type: Sequelize.INTEGER,
          references: { model: 'skin_oiliness', key: 'id' },
          onDelete: 'CASCADE',
          allowNull: true,
        },
        skin_acne_id: {
          type: Sequelize.INTEGER,
          references: { model: 'skin_acne', key: 'id' },
          onDelete: 'CASCADE',
          allowNull: true,
        },
        skin_lines_id: {
          type: Sequelize.INTEGER,
          references: { model: 'skin_lines', key: 'id' },
          onDelete: 'CASCADE',
          allowNull: true,
        },
        rating: {
          type: Sequelize.FLOAT,
          allowNull: true,
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
    return queryInterface.dropTable({ tableName: 'product_ratings' });
  },
};
