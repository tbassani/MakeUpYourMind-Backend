const { Sequelize, DataTypes, Model } = require('sequelize');
class Profiles extends Model {
  static init(sequelize) {
    super.init(
      {
        skin_color_id: {
          type: DataTypes.INTEGER,
        },
        skin_oiliness_id: {
          type: DataTypes.INTEGER,
        },
        skin_acne_id: {
          type: DataTypes.INTEGER,
        },
        skin_lines_id: {
          type: DataTypes.INTEGER,
        },
        deleted_at: {
          type: DataTypes.DATE,
          // allowNull defaults to true
        },
      },
      {
        sequelize,
        schema: 'make_up_your_mind',
        tableName: 'profiles',
      }
    );
  }
  static associate(models) {
    this.hasOne(models.SkinColor, { foreignKey: 'id', as: 'skin_color' });
    this.hasOne(models.SkinAcne, { foreignKey: 'id', as: 'skin_acne' });
    this.hasOne(models.SkinOiliness, { foreignKey: 'id', as: 'skin_oiliness' });
    this.hasOne(models.SkinLines, { foreignKey: 'id', as: 'skin_lines' });
    this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'owner_user' });
  }
}

module.exports = Profiles;
