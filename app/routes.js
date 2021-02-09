/* eslint-disable linebreak-style */
const express = require('express');
const cookieParser = require('cookie-parser');

const authConfig = require('../config/auth');
const authMiddleware = require('./middleware/auth');

const userController = require('./controllers/UserController');
const authController = require('./controllers/AuthController');
const productController = require('./controllers/ProductController');
const profileController = require('./controllers/ProfileController');
const ratingController = require('./controllers/RatingController');
const categoryController = require('./controllers/CategoryController');
const makerController = require('./controllers/MakerController');

const appRoutes = express.Router();

appRoutes
  .get('/', (req, res) => {
    res.status(200).send('Bem vindo ao Make Up Your Mind!');
  })
  .use(cookieParser(authConfig.secret))
  .post('/login', authController.authenticate)
  .post('/register', userController.create)
  .get('/check_token', authController.checkToken)
  .get('/profiles', profileController.getProfiles)

  // .get('/insert_all_makers', productController.insertAllMakers)
  // .get('/insert_all_categories', productController.insertAllCategories)
  // .get('/insert_all_products', productController.insertAll)
  //Products

  .get('/products', productController.getAll)
  .get('/products_maker/:maker', productController.getByMaker)
  .get('/products_category/:category', productController.getByCategory)
  .get('/products_maker_category/:maker/:category', productController.getByMakerAndCategory);
//Categories
appRoutes.get('/categories', categoryController.get);
//Maker
appRoutes.get('/makers', makerController.get);

appRoutes.use(authMiddleware);
appRoutes
  .get('/user_profile', profileController.getUserProfile)
  .post('/create_profile', profileController.create)
  .put('/update_profile', profileController.update);

appRoutes.get('/products_all_ratings', productController.getAllRatings);
appRoutes.get('/products_ratings', productController.getRatings);

appRoutes
  .get('/rating/:product_id', ratingController.get)
  .post('/rating/:product_id', ratingController.create)
  .delete('/rating/:product_id', ratingController.delete);

appRoutes.get('/logout', authController.logout);

module.exports = appRoutes;
