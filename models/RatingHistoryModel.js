const { Sequelize, DataTypes, Model } = require('sequelize');
class RatingHistory extends Model {
  static init(sequelize) {
    super.init(
      {
        rating: {
          type: Sequelize.FLOAT,
        },
        deleted_at: {
          type: DataTypes.DATE,
          // allowNull defaults to true
        },
      },
      {
        sequelize,
        schema: 'make_up_your_mind',
        tableName: 'rating_history',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'id', as: 'user' });
    this.belongsTo(models.Products, { foreignKey: 'id', as: 'product' });
  }
}

module.exports = RatingHistory;
