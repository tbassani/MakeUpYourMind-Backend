'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(
      { schema: 'make_up_your_mind', tableName: 'profiles' },
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onDelete: 'CASCADE',
        },
        skin_color_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'skin_color', key: 'id' },
          onDelete: 'SET NULL',
        },
        skin_oiliness_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'skin_oiliness', key: 'id' },
          onDelete: 'SET NULL',
        },
        skin_acne_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'skin_acne', key: 'id' },
          onDelete: 'SET NULL',
        },
        skin_lines_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'skin_lines', key: 'id' },
          onDelete: 'SET NULL',
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
    return queryInterface.dropTable({ schema: 'make_up_your_mind', tableName: 'profiles' });
  },
};
