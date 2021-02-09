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
        tableName: 'rating_history',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'id', as: 'user' });
    this.belongsTo(models.Products, { foreignKey: 'id', as: 'product' });
  }
}

module.exports = RatingHistory;
