'use strict';
const { model } = require('mongoose');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            
            Products.belongsTo(models.CategoryDetail, { foreignKey: 'categoryDetailId', targetKey: 'id', as: 'dataCategoryDetail' })
            Products.hasMany(models.Description, { foreignKey: 'productId', as: 'dataDescriptions' })
            Products.hasMany(models.ImageProduct, { foreignKey: 'productId', as: 'dataImageProducts' })
            Products.belongsTo(models.Brand, { foreignKey: 'brandId', targetKey: 'id', as: 'dataBrands' })
            Products.belongsTo(models.Logo, { foreignKey: 'logoId', targetKey: 'id', as: 'dataLogos' })
            Products.belongsTo(models.Discount, { foreignKey: 'discountId', targetKey: 'id', as: 'dataDiscounts' })
            Products.hasMany(models.ColorDetail, { foreignKey: 'productId', as: 'dataColorDetail' })
            Products.belongsToMany(models.Size, { through: models.SizeDetail, foreignKey: 'productId', as: 'dataSizeDetail' })
            Products.hasMany(models.Review, { foreignKey: 'productId', as: 'dataReviewProduct' })    
            Products.belongsTo(models.ProductType, { foreignKey: 'productTypeId', targetKey: 'id', as: 'dataProductType' })
            Products.belongsToMany(models.Cart, { through: models.CartDetail, foreignKey: 'productId' ,as: 'dataCartProduct' }) 
            
            // Products.belongsToMany(models.User, { through: models.Favourite, foreignKey: 'productId', as: 'dataProductFavourite' })
            
            Products.hasMany(models.Favourite, { foreignKey: 'productId', as: 'dataProductFavourite' })
            Products.belongsToMany(models.Order, { through: models.OrderDetail , foreignKey: 'productId', as: 'dataOrderProduct' })
        }
    }   
    Products.init({
        name: DataTypes.STRING,
        code: DataTypes.STRING,
        price: DataTypes.FLOAT,
        categoryDetailId: DataTypes.INTEGER,
        discountId: DataTypes.INTEGER,
        image: DataTypes.STRING,
        productionSite: DataTypes.STRING,
        releaseDate: DataTypes.DATE,
        brandId: DataTypes.INTEGER,
        material: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        logoId: DataTypes.INTEGER,
        gender: DataTypes.STRING,
        status: DataTypes.TINYINT,
        productTypeId: DataTypes.INTEGER,
        quantitySold: DataTypes.INTEGER,
        originalPrice: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Products;
};