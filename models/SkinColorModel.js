const { Sequelize, DataTypes, Model } = require('sequelize');
class SkinColor extends Model {
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
        tableName: 'skin_color',
      }
    );
  }
}

module.exports = SkinColor;
