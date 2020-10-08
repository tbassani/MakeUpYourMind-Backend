const { Sequelize, DataTypes, Model } = require('sequelize');
class ProductRatings extends Model {
  static init(sequelize) {
    super.init(
      {
        product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        skin_color_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true,
        },
        skin_oiliness_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true,
        },
        skin_acne_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true,
        },
        skin_lines_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true,
        },
        rating: {
          type: DataTypes.FLOAT,
        },
        deleted_at: {
          type: DataTypes.DATE,
          // allowNull defaults to true
        },
      },
      {
        sequelize,
        schema: 'make_up_your_mind',
        tableName: 'product_ratings',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
  }
  static associate(models) {
    this.hasOne(models.SkinColor, { foreignKey: 'id', as: 'skin_color' });
    this.hasOne(models.SkinAcne, { foreignKey: 'id', as: 'skin_acne' });
    this.hasOne(models.SkinOiliness, { foreignKey: 'id', as: 'skin_oiliness' });
    this.hasOne(models.SkinLines, { foreignKey: 'id', as: 'skin_lines' });
    this.belongsTo(models.Products, { foreignKey: 'product_id', as: 'product' });
    this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = ProductRatings;
