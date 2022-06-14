'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      shop.hasMany(models.coffee);
    }
  };
  shop.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'shop',
  });
  return shop;
};