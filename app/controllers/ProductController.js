/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt');
const http = require('http');
const querystring = require('querystring');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const products = require('../../models/ProductModel');
const users = require('../../models/UserModel');
const makers = require('../../models/MakersModel');
const categories = require('../../models/CategoriesModel');
const rating = require('../../models/ProductRatingModel');
const apiConfig = require('../../config/APIs');
const dbConfig = require('../../config/database');
const conn = new Sequelize(dbConfig);

module.exports = {
  async insertAll(req, res, next) {
    console.log('INSERT ALL PRODUCTS');
    try {
      const options = {
        host: apiConfig.host,
        port: apiConfig.port,
        path: '/all_products/sephora',
        method: 'GET',
        headers: {},
      };
      var request = http.request(options, function (resp) {
        resp.setEncoding('utf-8');

        var responseString = '';

        resp.on('data', function (data) {
          if (data && data !== undefined && data.length !== 0) {
            responseString += data;
          }
        });

        resp.on('end', function () {
          const new_products = JSON.parse(responseString);

          new_products.forEach((page) => {
            page.forEach((product) => {
              console.log(product);

              products.create({
                name: product.name,
                maker: product.maker,
                price: product.price,
                img_src: product.img_src,
                ref: product.ref,
                deleted_at: null,
                external_id: product.id,
                get_new_by: new Date(Date.now() + 60 * 60 * 48 * 1000),
                category: product.category,
              });
            });
          });

          res.status(200).json(JSON.parse(responseString));
        });
      });
      request.end();
    } catch (error) {
      next(error);
    }
  },
  async insertAllCategories(req, res, next) {
    console.log('INSERT ALL Categories');
    try {
      const options = {
        host: apiConfig.host,
        port: apiConfig.port,
        path: '/all_categories/sephora',
        method: 'GET',
        headers: {},
      };
      var request = http.request(options, function (resp) {
        resp.setEncoding('utf-8');

        var responseString = '';

        resp.on('data', function (data) {
          if (data && data !== undefined && data.length !== 0) {
            responseString += data;
          }
        });

        resp.on('end', function () {
          const new_products = JSON.parse(responseString);

          new_products.forEach((page) => {
            console.log(page);

            categories.create({
              description: page,
              deleted_at: null,
            });
          });

          res.status(200).json(JSON.parse(responseString));
        });
      });
      request.end();
    } catch (error) {
      next(error);
    }
  },

  async insertAllMakers(req, res, next) {
    console.log('INSERT ALL PRODUCTS');
    try {
      const options = {
        host: apiConfig.host,
        port: apiConfig.port,
        path: '/all_makers/sephora',
        method: 'GET',
        headers: {},
      };
      var request = http.request(options, function (resp) {
        resp.setEncoding('utf-8');

        var responseString = '';

        resp.on('data', function (data) {
          if (data && data !== undefined && data.length !== 0) {
            responseString += data;
          }
        });

        resp.on('end', function () {
          const new_products = JSON.parse(responseString);

          new_products.forEach((page) => {
            console.log(page);

            makers.create({
              description: page,
              deleted_at: null,
            });
          });

          res.status(200).json(JSON.parse(responseString));
        });
      });
      request.end();
    } catch (error) {
      next(error);
    }
  },
  async getByMaker(req, res, next) {
    const { maker } = req.params;
    const { name, page } = req.query;
    console.log('GET BY MAKER');
    console.log('PAGE: ' + page);
    try {
      var product_list = [];
      if (!name) {
        product_list = await products.findAndCountAll({
          where: { maker },
          offset: (page - 1) * 10,
          limit: 10,
        });
      } else {
        var query = `%${name.toUpperCase()}%`;
        product_list = await products.findAndCountAll({
          where: {
            [Op.and]: [
              Sequelize.where(Sequelize.fn('upper', Sequelize.col('name')), {
                [Op.like]: query,
              }),
              {
                [Op.and]: [{ maker }],
              },
            ],
          },
          offset: (page - 1) * 10,
          limit: 10,
        });
      }
      res.header('Access-Control-Allow-Origin', process.env.APP_URL);
      res.header('X-Total-Count', product_list.count);
      res.header('X-Per-Page', 10);
      return res.status(200).json(product_list.rows);
    } catch (error) {
      next(error);
    }
  },
  async getByCategory(req, res, next) {
    const { category } = req.params;
    const { name, page } = req.query;
    console.log('GET BY CATEGORY');
    try {
      var product_list = [];
      if (!name) {
        product_list = await products.findAndCountAll({
          where: { category },
          offset: (page - 1) * 10,
          limit: 10,
        });
      } else {
        var query = `%${name.toUpperCase()}%`;
        product_list = await products.findAndCountAll({
          where: {
            [Op.and]: [
              Sequelize.where(Sequelize.fn('upper', Sequelize.col('name')), {
                [Op.like]: query,
              }),
              {
                [Op.and]: [{ category }],
              },
            ],
          },
          offset: (page - 1) * 10,
          limit: 10,
        });
      }
      res.header('Access-Control-Allow-Origin', process.env.APP_URL);
      res.header('X-Total-Count', product_list.count);
      res.header('X-Per-Page', 10);
      return res.status(200).json(product_list.rows);
    } catch (error) {
      next(error);
    }
  },
  async getByMakerAndCategory(req, res, next) {
    const { maker, category, page } = req.query;
    var product_list = [];
    try {
      if (!name) {
        product_list = await products.findAndCountAll({
          where: { category, maker },
          offset: (page - 1) * 10,
          limit: 10,
        });
      } else {
        var query = `%${name.toUpperCase()}%`;
        product_list = await products.findAndCountAll({
          where: {
            [Op.and]: [
              Sequelize.where(Sequelize.fn('upper', Sequelize.col('name')), {
                [Op.like]: query,
              }),
              {
                [Op.and]: [{ maker, category }],
              },
            ],
          },
          offset: (page - 1) * 10,
          limit: 10,
        });
      }
      res.header('Access-Control-Allow-Origin', process.env.APP_URL);
      res.header('X-Total-Count', product_list.count);
      res.header('X-Per-Page', 10);
      return res.status(200).json(product_list.rows);
    } catch (error) {
      next(error);
    }
  },
  async getAll(req, res, next) {
    console.log('GET ALL PRODUCTS');
    var product_list = [];
    const { name, page, maker, category } = req.query;
    var where_clause = {};
    if (maker && category) {
      where_clause.maker = maker;
      where_clause.category = category;
    } else if (maker) {
      where_clause.maker = maker;
    } else if (category) {
      where_clause.category = category;
    }
    try {
      if (!name) {
        product_list = await products.findAndCountAll({
          where: where_clause,
          offset: (page - 1) * 10,
          limit: 10,
        });
      } else {
        var query = `%${name.toUpperCase()}%`;
        product_list = await products.findAndCountAll({
          where: {
            [Op.and]: [
              Sequelize.where(Sequelize.fn('upper', Sequelize.col('name')), {
                [Op.like]: query,
              }),
              where_clause,
            ],
          },
          offset: (page - 1) * 10,
          limit: 10,
        });
      }

      res.header('Access-Control-Allow-Origin', process.env.APP_URL);
      res.header('X-Total-Count', product_list.count);
      res.header('X-Per-Page', 10);
      return res.status(200).json(product_list.rows);
    } catch (error) {
      next(error);
    }
  },

  async getAllRatings(req, res, next) {
    var list = [];
    try {
      const user_profile = await users.findByPk(req.user_id, {
        include: { association: 'user_profile' },
      });
      const profile = user_profile.dataValues.user_profile.dataValues;

      const { maker, category, page, name } = req.query;
      const offset = (page - 1) * 10;

      var where_clause =
        ` AND "ratings"."skin_color_id" = ${profile.skin_color_id} ` +
        `AND "ratings"."skin_acne_id" = ${profile.skin_acne_id} ` +
        `AND "ratings"."skin_lines_id" = ${profile.skin_lines_id} ` +
        `AND "ratings"."skin_oiliness_id" = ${profile.skin_oiliness_id} `;
      if (maker && category) {
        where_clause =
          `WHERE "Products"."maker" = '${maker}' ` + `AND "Products"."category" = '${category}'`;
      } else if (maker) {
        where_clause = `WHERE "Products"."maker" = '${maker}' `;
      } else if (category) {
        where_clause = `WHERE "Products"."category" = '${category}' `;
      }

      if (!name) {
        console.log('GET ALL PRODUCTS AND RATINGS');
        list = await conn.query(
          `SELECT 
        "Products"."id", 
        "Products"."name", 
        "Products"."maker", 
        "Products"."price", 
        "Products"."img_src", 
        "Products"."ref", 
        "Products"."category", 
        "Products"."external_id", 
        SUM("ratings"."rating") AS "totalRating", 
        COUNT("ratings"."rating") AS "ratingAmount" 
        FROM "make_up_your_mind"."products" AS "Products"
        LEFT OUTER JOIN "make_up_your_mind"."product_ratings" AS "ratings" 
        ON "Products"."id" = "ratings"."product_id" ${where_clause} 
        GROUP BY "id" LIMIT 10 OFFSET ${offset};`,
          { type: Sequelize.QueryTypes.SELECT }
        );
      } else {
        var query = `'%${name.toUpperCase()}%'`;
        where_clause =
          ` AND "ratings"."skin_color_id" = ${profile.skin_color_id} ` +
          `AND "ratings"."skin_acne_id" = ${profile.skin_acne_id} ` +
          `AND "ratings"."skin_lines_id" = ${profile.skin_lines_id} ` +
          `AND "ratings"."skin_oiliness_id" = ${profile.skin_oiliness_id} ` +
          `WHERE UPPER("Products"."name") LIKE ${query} `;

        list = await conn.query(
          `SELECT 
        "Products"."id", 
        "Products"."name", 
        "Products"."maker", 
        "Products"."price", 
        "Products"."img_src", 
        "Products"."ref", 
        "Products"."category", 
        "Products"."external_id", 
        SUM("ratings"."rating") AS "totalRating", 
        COUNT("ratings"."rating") AS "ratingAmount" 
        FROM "make_up_your_mind"."products" AS "Products"
        LEFT OUTER JOIN "make_up_your_mind"."product_ratings" AS "ratings" 
        ON "Products"."id" = "ratings"."product_id" ${where_clause} 
        GROUP BY "id" LIMIT 10 OFFSET ${offset};`,
          { type: Sequelize.QueryTypes.SELECT }
        );
      }

      res.header('Access-Control-Allow-Origin', process.env.APP_URL);
      res.header('X-Per-Page', 10);
      return res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  },

  async getRatings(req, res, next) {
    console.log('GET RATINGS');
    var product_list = [];
    try {
      const user_profile = await users.findByPk(req.user_id, {
        include: { association: 'user_profile' },
      });
      const profile = user_profile.dataValues.user_profile.dataValues;

      var page = 1;

      const product_ratings = await products.findAll({
        include: { association: 'ratings' },
      });

      console.log(product_ratings);

      res.header('Access-Control-Allow-Origin', process.env.APP_URL);
      res.header('X-Total-Count', product_ratings);
      res.header('X-Per-Page', 10);
      return res.status(200).json(product_ratings.count);
    } catch (error) {
      next(error);
    }
  },
};
