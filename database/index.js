const sequelize = require('sequelize');
const dbConfig = require('../config/database');

const users = require('../models/UserModel');
const products = require('../models/ProductModel');
const skinAcne = require('../models/SkinAcneModel');
const skincolor = require('../models/SkinColorModel');
const skinLines = require('../models/SkinLinesModel');
const skinOiliness = require('../models/SkinOilinessModel');
const profiles = require('../models/ProfilesModel');
const productRating = require('../models/ProductRatingModel');
const ratingHistory = require('../models/RatingHistoryModel');
const makers = require('../models/MakersModel');
const categories = require('../models/CategoriesModel');

const conn = new sequelize(process.env.DB_URL);

users.init(conn);
products.init(conn);
skinAcne.init(conn);
skincolor.init(conn);
skinLines.init(conn);
skinOiliness.init(conn);
profiles.init(conn);
productRating.init(conn);
ratingHistory.init(conn);
makers.init(conn);
categories.init(conn);

users.associate(conn.models);
profiles.associate(conn.models);
productRating.associate(conn.models);
products.associate(conn.models);
ratingHistory.associate(conn.models);

module.exports = conn;
