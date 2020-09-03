const { Sequelize, DataTypes, Model } = require('sequelize');
class Products extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        maker: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        img_src: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ref: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        deleted_at: {
          type: DataTypes.DATE,
          // allowNull defaults to true
        },
        external_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
        get_new_by: {
          type: DataTypes.DATE,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        schema: 'make_up_your_mind',
        tableName: 'products',
      }
    );
  }
  static associate(models) {
    this.hasMany(models.ProductRatings, { foreignKey: 'product_id', as: 'ratings' });
    this.hasMany(models.RatingHistory, { foreignKey: 'product_id', as: 'history' });
  }
}

module.exports = Products;
