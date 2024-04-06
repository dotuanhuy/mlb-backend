'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProductType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ProductType.hasMany(models.Product, { foreignKey: 'ProductTypeId', as: 'dataProductType' })
            ProductType.belongsTo(models.Category, { foreignKey: 'categoryId', targetKey: 'id', as: 'dataProductTypeCategory' })
        }
    }
    ProductType.init({
        name: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        categoryId: DataTypes.INTEGER,
        imageRoot: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ProductType',
    });
    return ProductType;
};