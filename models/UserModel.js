const { Sequelize, DataTypes, Model } = require('sequelize');
class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password_reset_token: {
          type: DataTypes.STRING,
          // allowNull defaults to true
        },
        password_reset_expires: {
          type: DataTypes.DATE,
          // allowNull defaults to true
        },
        deleted_at: {
          type: DataTypes.DATE,
          // allowNull defaults to true
        },
      },
      {
        sequelize,
        tableName: 'users',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
  }
  static associate(models) {
    this.hasOne(models.Profiles, { foreignKey: 'user_id', as: 'user_profile' });
    this.hasMany(models.ProductRatings, { foreignKey: 'user_id', as: 'user_ratings' });
    this.hasMany(models.RatingHistory, { foreignKey: 'user_id', as: 'user_history' });
  }
}

module.exports = Users;
