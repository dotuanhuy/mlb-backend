'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Review.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'dataReviewUser'})
            Review.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id', as: 'dataReviewProduct'})
            Review.hasOne(models.Feedback, { foreignKey: 'reviewId', as: 'dataFeedbackReview' })
        }
    }
    Review.init({
        userId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        rate: DataTypes.INTEGER,
        content: DataTypes.TEXT('long'),
        status: DataTypes.TINYINT
    }, {
        sequelize,
        modelName: 'Review',
    });
    return Review;
};