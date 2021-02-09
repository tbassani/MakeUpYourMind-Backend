require('dotenv').config();

module.exports = {
  database: process.env.DATABASE,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  port: process.env.PORT,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  define: {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  },
};
