'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Category.hasMany(models.CategoryDetail, { foreignKey: 'categoryId', as: 'dataCategory' })
            Category.hasMany(models.ProductType, { foreignKey: 'categoryId', as: 'dataProductTypeCategory' })
        }
    }
    Category.init({
        name: DataTypes.STRING,
        type: DataTypes.STRING(20),
        status: DataTypes.TINYINT
    }, {
        sequelize,
        modelName: 'Category',
    });
    return Category;
};