'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const modelInterface = require('./modelInterface');
const reviewSchema = require('./review.schema');
const showSchema = require('./show.schema');
const userSchema = require('./user.schema');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/backend';

// const sequelize = new Sequelize(DATABASE_URL);

Add
const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
     ssl: {
      require: true,
      rejectUnauthorized: false,
    },
   },
});   


// create our associations between tables - show id between Show and Review tables, user id between User and Review tables 

const UserModel = userSchema(sequelize, DataTypes);
const ReviewModel = reviewSchema(sequelize, DataTypes);
const ShowModel = showSchema(sequelize, DataTypes);

UserModel.hasMany(ReviewModel, { foreignKey: 'userId', sourceKey: 'id' });
ReviewModel.belongsTo(UserModel, { foreignKey: 'userId', targetKey: 'id' });
ShowModel.hasMany(ReviewModel, { foreignKey: 'showId', sourceKey: 'id' });
ReviewModel.belongsTo(ShowModel, { foreignKey: 'showId', targetKey: 'id' });

module.exports = {
  sequelize,
  reviewInterface: new modelInterface(ReviewModel),
  userInterface: new modelInterface(UserModel),
  showInterface: new modelInterface(ShowModel),
};