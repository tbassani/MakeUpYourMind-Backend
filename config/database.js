require('dotenv').config();

module.exports = {
  database: process.env.DATABASE,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  ssl: true,
  define: {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  },
};
