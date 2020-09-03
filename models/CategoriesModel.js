const { Sequelize, DataTypes, Model } = require('sequelize');
class CategoriesModel extends Model {
  static init(sequelize) {
    super.init(
      {
        description: {
          type: Sequelize.STRING,
        },
        deleted_at: {
          type: DataTypes.DATE,
          // allowNull defaults to true
        },
      },
      {
        sequelize,
        schema: 'make_up_your_mind',
        tableName: 'categories',
      }
    );
  }
}

module.exports = CategoriesModel;
